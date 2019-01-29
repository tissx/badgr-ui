import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { RecipientBadgeManager } from "../../services/recipient-badge-manager.service";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { UrlValidator } from "../../../common/validators/url.validator";
import { JsonValidator } from "../../../common/validators/json.validator";
import { MessageService } from "../../../common/services/message.service";
import { BadgrApiFailure } from "../../../common/services/api-failure";
import { BaseDialog } from "../../../common/dialogs/base-dialog";
import { preloadImageURL } from "../../../common/util/file-util";
import { FormFieldText } from "../../../common/components/formfield-text";


type dialogViewStates = "upload" | "url" | "json";


@Component({
	selector: 'add-badge-dialog',
	templateUrl: './add-badge-dialog.component.html',
})
export class AddBadgeDialogComponent extends BaseDialog {

	protected get controls(): AddBadgeDialogForm<FormControl> {
		return this.addRecipientBadgeForm.controls as any;
	}

	static defaultOptions = {} as AddBadgeDialogOptions;
	readonly uploadBadgeImageUrl = require('../../../../breakdown/static/images/image-uplodBadge.svg');
	readonly pasteBadgeImageUrl = preloadImageURL(require('../../../../breakdown/static/images/image-uplodBadgeUrl.svg'));

	EMPTY_FORM_ERROR = "At least one input is required to add a badge.";

	addRecipientBadgeForm: FormGroup;
	showAdvance: boolean = false;
	formError: string;

	currentDialogViewState: dialogViewStates = "upload";

	options: AddBadgeDialogOptions = AddBadgeDialogComponent.defaultOptions;
	resolveFunc: () => void;
	rejectFunc: (err?: any) => void;

	badgeUploadPromise: Promise<any>;

	@ViewChild("jsonField")
	private jsonField: FormFieldText;

	@ViewChild("urlField")
	private urlField: FormFieldText;

	constructor(
		componentElem: ElementRef,
		renderer: Renderer2,
		protected recipientBadgeManager: RecipientBadgeManager,
		protected formBuilder: FormBuilder,
		protected messageService: MessageService
	) {
		super(componentElem, renderer);
		this.initAddRecipientBadgeForm()
	}

	protected initAddRecipientBadgeForm() {
		this.addRecipientBadgeForm = this.formBuilder.group({
			image: [],
			url: ['', UrlValidator.validUrl],
			assertion: ['', JsonValidator.validJson]
		} as AddBadgeDialogForm<any[]>)
	}

	/**
	 * Opens the confirm dialog with the given options. If the user clicks the "true" button, the promise will be
	 * resolved, otherwise, it will be rejected.
	 *
	 * @param customOptions Options for the dialog
	 * @returns {Promise<void>}
	 */
	openDialog(
		customOptions: AddBadgeDialogOptions
	): Promise<void> {
		this.options = Object.assign({}, AddBadgeDialogComponent.defaultOptions, customOptions);
		this.addRecipientBadgeForm.reset();
		this.showModal();

		return new Promise<void>((resolve, reject) => {
			this.resolveFunc = resolve;
			this.rejectFunc = reject;
		});
	}

	closeDialog() {
		this.closeModal();
		this.resolveFunc();
	}

	submitBadgeRecipientForm(formState: AddBadgeDialogForm<string | null>) {
		if (this.formHasValue(formState) && this.addRecipientBadgeForm.valid) {
			this.badgeUploadPromise = this.recipientBadgeManager
				.createRecipientBadge(formState)
				.then(instance => {
					this.messageService.reportMajorSuccess("Badge successfully imported.")
					this.closeDialog();
				})
				.catch(err => {
					let message = BadgrApiFailure.from(err).firstMessage;

					// display human readable description of first error if provided by server
					if (err.response && err.response._body) {
							const body = JSON.parse(err.response._body);
							if (body && body.length > 0 && body[0].description) {
								message = body[0].description;
							}
					}

					this.messageService.reportAndThrowError(
						message
							? `Failed to upload badge: ${message}`
							: `Badge upload failed due to an unknown error`,
						err
					);
				})
				.catch(e => {
					this.closeModal();
					this.rejectFunc(e);
				})
		} else {
			this.formError = "At least one badge input is required";
		}
	}

	controlUpdated(formControlName: string) {
		this.clearAllButMe(formControlName);
	}

	clearAllButMe(formControlName: string) {
		const controls = this.addRecipientBadgeForm.controls;

		Object.getOwnPropertyNames(controls)
			.forEach(formItem => {
				if (controls[formItem] !== controls[formControlName]) {
					(controls[formItem] as FormControl).setValue("");
				}
			})
	}

	openUrlTab() {
		this.currentDialogViewState = 'url';
		// Wait for angular to render the field
		setTimeout(() => this.urlField.select());
	}
	openJsonTab() {
		this.currentDialogViewState = 'json';
		// Wait for angular to render the field
		setTimeout(() => this.jsonField.select());
	}

	clearFormError() {
		this.formError = undefined;
	}

	private formHasValue(formState): boolean {
		let formHasValue = false;
		Object.getOwnPropertyNames(formState)
			.forEach(formItem => {
				if (formState[formItem]) {
					formHasValue = true;
				}
			}
			);
		return formHasValue;
	}
}

export interface AddBadgeDialogOptions {};

interface AddBadgeDialogForm<T> {
	image: T;
	url: T;
	assertion: T;
}
