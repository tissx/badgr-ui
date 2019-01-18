import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {BaseAuthenticatedRoutableComponent} from "../../../common/pages/base-authenticated-routable.component";

import {SessionService} from "../../../common/services/session.service";
import {MessageService} from "../../../common/services/message.service";
import {IssuerManager} from "../../services/issuer-manager.service";
import {Title} from "@angular/platform-browser";
import {Issuer, IssuerStaffMember, issuerStaffRoles} from "../../models/issuer.model";
import {preloadImageURL} from "../../../common/util/file-util";
import {EmailValidator} from "../../../common/validators/email.validator";
import {FormFieldSelectOption} from "../../../common/components/formfield-select";
import {markControlsDirty} from "../../../common/util/form-util";
import {BadgrApiFailure} from "../../../common/services/api-failure";
import {CommonDialogsService} from "../../../common/services/common-dialogs.service";
import {UserProfileManager} from "../../../common/services/user-profile-manager.service";
import {UserProfileEmail} from "../../../common/model/user-profile.model";
import {IssuerStaffRoleSlug} from "../../models/issuer-api.model";
import {AppConfigService} from "../../../common/app-config.service";


@Component({
	templateUrl: './issuer-staff.component.html'
})
export class IssuerStaffComponent extends BaseAuthenticatedRoutableComponent implements OnInit {
	readonly issuerImagePlaceHolderUrl = preloadImageURL(require(
		'../../../../breakdown/static/images/placeholderavatar-issuer.svg'));

	issuer: Issuer;
	issuerSlug: string;
	issuerLoaded: Promise<Issuer>;
	profileEmailsLoaded: Promise<UserProfileEmail[]>;
	profileEmails: UserProfileEmail[] = [];
	staffCreateForm: FormGroup;

	constructor(
		loginService: SessionService,
		router: Router,
		route: ActivatedRoute,
		protected formBuilder: FormBuilder,
		protected title: Title,
		protected messageService: MessageService,
		protected issuerManager: IssuerManager,
		protected profileManager: UserProfileManager,
		protected configService: AppConfigService,
		protected dialogService: CommonDialogsService
	) {
		super(router, route, loginService);
		title.setTitle(`Manage Issuer Staff - ${this.configService.theme['serviceName'] || "Badgr"}`);

		this.issuerSlug = this.route.snapshot.params[ 'issuerSlug' ];
		this.issuerLoaded = this.issuerManager.issuerBySlug(this.issuerSlug)
			.then(issuer => this.issuer = issuer);

		this.profileEmailsLoaded = this.profileManager.userProfilePromise
			.then(profile => profile.emails.loadedPromise)
			.then(emails => this.profileEmails = emails.entities);

		this.initStaffCreateForm();
	}

	private _issuerStaffRoleOptions: FormFieldSelectOption[];
	get issuerStaffRoleOptions() {
		return this._issuerStaffRoleOptions || (this._issuerStaffRoleOptions = issuerStaffRoles.map(r => ({
			label: r.label,
			value: r.slug
		})));
	}

	get isCurrentUserIssuerOwner() {
		return this.issuer && this.issuer.currentUserStaffMember && this.issuer.currentUserStaffMember.isOwner
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Staff Editing

	changeMemberRole(
		member: IssuerStaffMember,
		roleSlug: IssuerStaffRoleSlug
	) {
		member.roleSlug = roleSlug;

		member.save().then(
			() => {
				this.messageService.reportMajorSuccess(`${member.nameLabel}'s role has been changed to ${member.roleInfo.label}`);
				this.initStaffCreateForm();
			},
			error => this.messageService.reportHandledError(`Failed to edit member: ${BadgrApiFailure.from(error).firstMessage}`)
		);
	}

	async removeMember(member: IssuerStaffMember) {
		if (!await this.dialogService.confirmDialog.openTrueFalseDialog({
				dialogTitle: `Remove ${member.nameLabel}?`,
				dialogBody: `${member.nameLabel} is ${member.roleInfo.indefiniteLabel} of ${this.issuer.name}. Are you sure you want to remove them from this role?`,
				resolveButtonLabel: `Remove ${member.nameLabel}`,
				rejectButtonLabel: "Cancel",
			})) {
			return;
		}

		return member.remove().then(
			() => this.messageService.reportMinorSuccess(`Removed ${member.nameLabel} from ${this.issuer.name}`),
			error => this.messageService.reportHandledError(`Failed to add member: ${BadgrApiFailure.from(error).firstMessage}`)
		);
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Staff Creation

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
				this.initStaffCreateForm();
			},
			error => this.messageService.reportHandledError(`Failed to add member: ${BadgrApiFailure.from(error).firstMessage}`)
		);
	}
}

interface StaffCreateForm<T> {
	staffRole: T;
	staffEmail: T;
}
