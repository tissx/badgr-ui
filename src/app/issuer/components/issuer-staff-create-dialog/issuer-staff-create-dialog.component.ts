import { Component, ElementRef, Renderer2 } from '@angular/core';
import { BaseDialog } from "../../../common/dialogs/base-dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmailValidator } from "../../../common/validators/email.validator";
import { markControlsDirty } from "../../../common/util/form-util";
import { IssuerStaffRoleSlug } from "../../models/issuer-api.model";
import { BadgrApiFailure } from "../../../common/services/api-failure";
import { MessageService } from "../../../common/services/message.service";
import { IssuerManager } from "../../services/issuer-manager.service";
import { Issuer, issuerStaffRoles } from "../../models/issuer.model";
import { FormFieldSelectOption } from "../../../common/components/formfield-select";
import { UserProfileManager } from "../../../common/services/user-profile-manager.service";
import { AppConfigService } from "../../../common/app-config.service";
import { CommonDialogsService } from "../../../common/services/common-dialogs.service";

@Component({
  selector: 'issuer-staff-create-dialog',
  templateUrl: './issuer-staff-create-dialog.component.html',
  styleUrls: ['./issuer-staff-create-dialog.component.css']
})
export class IssuerStaffCreateDialogComponent extends BaseDialog {

	staffCreateForm: FormGroup;
	issuer: Issuer;
	issuerSlug: string;
	issuerLoaded: Promise<Issuer>;

	private _issuerStaffRoleOptions: FormFieldSelectOption[];
	constructor(
		componentElem: ElementRef,
		renderer: Renderer2,
		protected formBuilder: FormBuilder,
		protected messageService: MessageService,
		protected issuerManager: IssuerManager,
		protected profileManager: UserProfileManager,
		protected configService: AppConfigService,
		protected dialogService: CommonDialogsService,
	) {
		super(componentElem, renderer);
		this.initStaffCreateForm();
	}

	open = () => this.showModal();
	close = () => this.closeModal();

	get issuerStaffRoleOptions() {
		return this._issuerStaffRoleOptions || (this._issuerStaffRoleOptions = issuerStaffRoles.map(r => ({
			label: r.label,
			value: r.slug
		})));
	}

	protected initStaffCreateForm() {
		this.staffCreateForm = this.formBuilder.group({
			staffRole: [ 'staff', Validators.required ],
			staffEmail: [
				'', Validators.compose([
					Validators.required,
					EmailValidator.validEmail
				])
			],
		} as StaffCreateForm<any[]>);
	}

	submitStaffCreate(formData: StaffCreateForm<string>) {
		if (!this.staffCreateForm.valid) {
			markControlsDirty(this.staffCreateForm);
			return;
		}

		return this.issuer.addStaffMember(
			formData.staffRole as IssuerStaffRoleSlug,
			formData.staffEmail
		).then(
			() => {
				this.messageService.reportMinorSuccess(`Added ${formData.staffEmail} as ${formData.staffRole}`);
				// this.initStaffCreateForm();
				this.closeModal();
			},
			error => this.messageService.reportHandledError(`Failed to add member: ${BadgrApiFailure.from(error).firstMessage}`)
		);
	}
}

interface StaffCreateForm<T> {
	staffRole: T;
	staffEmail: T;
}
