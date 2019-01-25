import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";

import { BaseAuthenticatedRoutableComponent } from "../../../common/pages/base-authenticated-routable.component";

import { SessionService } from "../../../common/services/session.service";
import { MessageService } from "../../../common/services/message.service";

import {
	ApiBadgeClassAlignment,
	ApiBadgeClassForCreation,
	BadgeClassExpiresDuration
} from '../../models/badgeclass-api.model';
import { BadgeClassManager } from "../../services/badgeclass-manager.service";
import { IssuerManager } from "../../services/issuer-manager.service";
import { markControlsDirty } from "../../../common/util/form-util";
import { BadgeStudioComponent } from "../badge-studio/badge-studio.component";
import { BgFormFieldImageComponent } from "../../../common/components/formfield-image";
import { UrlValidator } from "../../../common/validators/url.validator";
import { CommonDialogsService } from "../../../common/services/common-dialogs.service";
import { BadgeClass } from "../../models/badgeclass.model";
import { AppConfigService } from "../../../common/app-config.service";


@Component({
	selector: 'badgeclass-edit-form',
	templateUrl: './badgeclass-edit-form.component.html'
})
export class BadgeClassEditFormComponent extends BaseAuthenticatedRoutableComponent implements OnInit {

	@Input()
	set badgeClass(badgeClass: BadgeClass) {
		if (this.existingBadgeClass !== badgeClass) {
			this.existingBadgeClass = badgeClass;
			this.initFormFromExisting();
		}
	}

	get badgeClass() {
		return this.existingBadgeClass;
	}

	get formControls(): BasicBadgeForm<FormControl, FormArray> {
		return this.badgeClassForm.controls as any;
	}

	get alignments() {
		return this.badgeClassForm.controls["alignments"] as FormArray;
	}

	get alignmentFieldDirty() {
		return this.formControls.badge_criteria_text.dirty || this.formControls.badge_criteria_url.dirty;
	}
	readonly badgeClassPlaceholderImageUrl = require('../../../../breakdown/static/images/placeholderavatar.svg');

	savePromise: Promise<BadgeClass> | null = null;
	badgeClassForm: FormGroup;

	@ViewChild("badgeStudio")
	badgeStudio: BadgeStudioComponent;

	@ViewChild("imageField")
	imageField: BgFormFieldImageComponent;

	@ViewChild("newTagInput")
	newTagInput: ElementRef;

	existingBadgeClass: BadgeClass | null = null;

	@Output()
	save = new EventEmitter<Promise<BadgeClass>>();

	@Output()
	cancel = new EventEmitter<void>();

	@Input()
	issuerSlug: string;

	@Input()
	submitText: string;

	@Input()
	submittingText: string;

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Tags
	tagsEnabled = false;
	tags = new Set<string>();
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Expiration
	expirationEnabled = false;
	expirationForm: FormGroup = undefined;


	durationOptions: {[key in BadgeClassExpiresDuration]: string} = {
		days: "Days",
		weeks: "Weeks",
		months: "Months",
		years: "Years"
	}


	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Alignments
	alignmentsEnabled = false;
	savedAlignments: AbstractControl[] = null;
	showAdvanced: boolean[] = [false];

	constructor(
		sessionService: SessionService,
		router: Router,
		route: ActivatedRoute,
		protected fb: FormBuilder,
		protected title: Title,
		protected messageService: MessageService,
		protected issuerManager: IssuerManager,
		private configService: AppConfigService,
		protected badgeClassManager: BadgeClassManager,

		protected dialogService: CommonDialogsService
	) {
		super(router, route, sessionService);
		title.setTitle(`Create Badge Class - ${this.configService.theme['serviceName'] || "Badgr"}`);

		this.badgeClassForm = fb.group({
			badge_name: [
				'',
				Validators.compose([
					Validators.required,
					Validators.maxLength(255)
				])
			],
			badge_image: ['', Validators.required],
			badge_description: ['', Validators.required],
			badge_criteria_url: [''],
			badge_criteria_text: [''],
			alignments: fb.array([]),
		} as BasicBadgeForm<any[], FormArray>, {
				validator: this.criteriaRequired
			});
	}

	initFormFromExisting() {
		const badgeClass = this.existingBadgeClass;

		this.badgeClassForm = this.fb.group({
			badge_name: [
				badgeClass.name,
				Validators.compose([
					Validators.required,
					Validators.maxLength(255)
				])
			],
			badge_image: [badgeClass.image, Validators.required],
			badge_description: [badgeClass.description, Validators.required],
			badge_criteria_url: [badgeClass.criteria_url],
			badge_criteria_text: [badgeClass.criteria_text],
			alignments: this.fb.array(this.badgeClass.alignments.map(alignment => this.fb.group({
				target_name: [alignment.target_name, Validators.required],
				target_url: [alignment.target_url, Validators.compose([Validators.required, UrlValidator.validUrl])],
				target_description: [alignment.target_description],
				target_framework: [alignment.target_framework],
				target_code: [alignment.target_code],
			} as AlignmentFormGroup<any[]>)))
		} as BasicBadgeForm<any[], FormArray>, {
				validator: this.criteriaRequired
			});

		this.tags = new Set();
		this.badgeClass.tags.forEach(t => this.tags.add(t));

		this.tagsEnabled = this.tags.size > 0;
		this.alignmentsEnabled = this.badgeClass.alignments.length > 0;
		if (badgeClass.expiresAmount && badgeClass.expiresDuration) {
			this.enableExpiration();
		}
	}

	ngOnInit() {
		super.ngOnInit();
	}

	enableTags() {
		this.tagsEnabled = true;
	}

	disableTags() {
		this.tagsEnabled = false;
	}

	addTag() {
		const newTag = ((this.newTagInput.nativeElement as HTMLInputElement).value || "").trim().toLowerCase();

		if (newTag.length > 0) {
			this.tags.add(newTag);
			(this.newTagInput.nativeElement as HTMLInputElement).value = "";
		}
	}

	handleTagInputKeyPress(event: KeyboardEvent) {
		if (event.keyCode === 13 /* Enter */) {
			this.addTag();
			(this.newTagInput.nativeElement as HTMLInputElement).focus();
			event.preventDefault();
		}
	}

	removeTag(tag: string) {
		this.tags.delete(tag);
	}

	enableExpiration() {
		const initialAmount = this.badgeClass ? this.badgeClass.expiresAmount : "";
		const initialDuration = this.badgeClass ? this.badgeClass.expiresDuration || "" : "";

		this.expirationEnabled = true;
		this.expirationForm = this.fb.group({
			expires_amount: [initialAmount, Validators.compose([Validators.required, this.positiveInteger])],
			expires_duration: [initialDuration, Validators.required],
		});
	}

	disableExpiration() {
		this.expirationEnabled = false;
		this.expirationForm = undefined;
	}

	enableAlignments() {
		this.alignmentsEnabled = true;
		if (this.savedAlignments) {
			this.savedAlignments.forEach(a => this.alignments.push(a));
			this.savedAlignments = null;
		}
		if (this.alignments.length === 0) {
			this.addAlignment();
		}
	}

	addAlignment() {
		const group = this.fb.group({
			target_name: ['', Validators.required],
			target_url: ['', Validators.compose([Validators.required, UrlValidator.validUrl])],
			target_description: [''],
			target_framework: [''],
			target_code: [''],
		} as AlignmentFormGroup<any[]>);

		this.alignments.push(group);
	}

	disableAlignments() {
		this.alignmentsEnabled = false;

		// Save the alignments so that they aren't validated after being removed, but can be restored if the user chooses to enable alignments again
		this.savedAlignments = this.alignments.controls.slice();
		while (this.alignments.length > 0)
			this.alignments.removeAt(0);
	}

	async removeAlignment(alignment: FormGroup) {
		const controls: AlignmentFormGroup<FormControl> = alignment.controls as any;

		if (controls.target_name.value.trim().length > 0
			|| controls.target_url.value.trim().length > 0
			|| controls.target_description.value.trim().length > 0
			|| controls.target_framework.value.trim().length > 0
			|| controls.target_code.value.trim().length > 0
		) {
			if (! await this.dialogService.confirmDialog.openTrueFalseDialog({
				dialogTitle: "Remove Alignment?",
				dialogBody: "Are you sure you want to remove this alignment? This action cannot be undone.",
				resolveButtonLabel: "Remove Alignment",
				rejectButtonLabel: "Cancel"
			})) return;
		}

		this.alignments.removeAt(this.alignments.controls.indexOf(alignment));
	}


	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	criteriaRequired(formGroup: FormGroup): { [id: string]: boolean } | null {
		const controls: BasicBadgeForm<FormControl, FormArray> = formGroup.controls as any;

		return ((controls.badge_criteria_url.value || "").trim().length || (controls.badge_criteria_text.value || "").trim().length)
			? null
			: { 'criteriaRequired': true };
	}

	async onSubmit(formState: BasicBadgeForm<string, ApiBadgeClassAlignment[]>) {
		const expirationState = this.expirationEnabled ? this.expirationForm.value : undefined;

		if (this.existingBadgeClass) {
			this.existingBadgeClass.name = formState.badge_name;
			this.existingBadgeClass.description = formState.badge_description;
			this.existingBadgeClass.image = formState.badge_image;
			this.existingBadgeClass.criteria_text = formState.badge_criteria_text;
			this.existingBadgeClass.criteria_url = formState.badge_criteria_url;
			this.existingBadgeClass.alignments = this.alignmentsEnabled ? formState.alignments : [];
			this.existingBadgeClass.tags = this.tagsEnabled ? Array.from(this.tags) : [];
			if (this.expirationEnabled) {
				this.existingBadgeClass.expiresDuration = expirationState.expires_duration as BadgeClassExpiresDuration;
				this.existingBadgeClass.expiresAmount = parseInt(expirationState.expires_amount, 10);
			} else {
				this.existingBadgeClass.clearExpires();
			}

			this.savePromise = this.existingBadgeClass.save();
		} else {
			let badgeClassData = {
				name: formState.badge_name,
				description: formState.badge_description,
				image: formState.badge_image,
				criteria_text: formState.badge_criteria_text,
				criteria_url: formState.badge_criteria_url,
				tags: this.tagsEnabled ? Array.from(this.tags) : [],
				alignment: this.alignmentsEnabled ? formState.alignments : [],
			} as ApiBadgeClassForCreation;
			if (this.expirationEnabled) {
				badgeClassData.expires = {
					duration: expirationState.expires_duration as BadgeClassExpiresDuration,
					amount: parseInt(expirationState.expires_amount, 10)
				}
			}


			this.savePromise = this.badgeClassManager.createBadgeClass(this.issuerSlug, badgeClassData);
		}

		this.save.emit(this.savePromise);
	}

	submitClicked(ev: Event) {
		let valid = true;

		if (!this.badgeClassForm.valid) {
			valid = false;
			ev.preventDefault();
			markControlsDirty(this.badgeClassForm);
		}
		if (this.expirationEnabled && !this.expirationForm.valid) {
			valid = false;
			ev.preventDefault();
			markControlsDirty(this.expirationForm);
		}

		if (!valid) {
			// fire on next cycle, otherwise the immediate click event will dismiss the formmessage before its viewed
			setTimeout(() => {
				window.scrollTo(0, 0);
				this.messageService.reportHandledError("There were errors in your submission. Please review and try again.")
			});
		}
	}

	cancelClicked() {
		this.cancel.emit();
	}

	generateRandomImage() {
		this.badgeStudio.generateRandom().then(imageUrl => this.imageField.useDataUrl(imageUrl, "Auto-generated image"))
	}

	positiveInteger(control: AbstractControl) {
		const val = parseInt(control.value, 10);
		if (isNaN(val) || val < 1) {
			return {"expires_amount": "Must be a positive integer"}
		}
	}
}

interface AlignmentFormGroup<T> {
	target_name: T;
	target_url: T;
	target_description: T;
	target_framework: T;
	target_code: T;
}

interface BasicBadgeForm<BasicType, AlignmentsType> {
	badge_name: BasicType;
	badge_image: BasicType;
	badge_description: BasicType;
	badge_criteria_url: BasicType;
	badge_criteria_text: BasicType;
	alignments: AlignmentsType;
}

