import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SessionService } from "../../../common/services/session.service";
import { MessageService } from "../../../common/services/message.service";
import { BaseAuthenticatedRoutableComponent } from "../../../common/pages/base-authenticated-routable.component";
import { RecipientGroupManager } from "../../services/recipientgroup-manager.service";
import { Title } from "@angular/platform-browser";
import { Issuer } from "../../models/issuer.model";
import { IssuerManager } from "../../services/issuer-manager.service";
import { RecipientGroup, RecipientGroupMember } from "../../models/recipientgroup.model";
import { PathwaySelectionDialog } from "../pathway-selection-dialog/pathway-selection-dialog.component";
import { LearningPathway } from "../../models/pathway.model";
import { CommonDialogsService } from "../../../common/services/common-dialogs.service";
import { FormFieldText } from "../../../common/components/formfield-text";
import { EmailValidator } from "../../../common/validators/email.validator";
import { RecipientSelectionDialog } from "../recipient-selection-dialog/recipient-selection-dialog.component";
import { jsonCopy } from "../../../common/util/deep-assign";
import { markControlsDirty } from "../../../common/util/form-util";
import { AppConfigService } from "../../../common/app-config.service";

@Component({
	selector: 'recipientGroup-detail',
	templateUrl: './recipientgroup-detail.component.html'
})
export class RecipientGroupDetailComponent extends BaseAuthenticatedRoutableComponent implements OnInit {
	memberCreateForm: FormGroup;
	memberEditForm: FormGroup;

	editingMember: RecipientGroupMember;

	viewLoaded: boolean = false;
	issuer: Issuer;

	recipientGroup: RecipientGroup;

	@ViewChild("pathwayDialog")
	pathwayDialog: PathwaySelectionDialog;

	@ViewChild("memberCreateName")
	memberCreateNameField: FormFieldText;

	@ViewChild("editMemberNameField")
	editMemberNameField: FormFieldText;

	@ViewChild("recipientSelectionDialog")
	recipientSelectionDialog: RecipientSelectionDialog;

	issuerLoaded: Promise<any>;
	groupLoaded: Promise<any>;

	constructor(
		loginService: SessionService,
		router: Router,
		route: ActivatedRoute,
		protected messageService: MessageService,
		protected title: Title,
		protected formBuilder: FormBuilder,
		protected recipientGroupManager: RecipientGroupManager,
		protected issuerManager: IssuerManager,
		protected configService: AppConfigService,
		protected dialogService: CommonDialogsService
	) {
		super(router, route, loginService);

		title.setTitle(`Recipient Group Detail - ${this.configService.theme['serviceName'] || "Badgr"}`);

		this.issuerLoaded = issuerManager.issuerBySlug(this.issuerSlug).then(
			issuer => this.issuer = issuer,
			error => messageService.reportAndThrowError(`Failed to load issuer ${this.issuerSlug}`, error)
		);

		this.groupLoaded = recipientGroupManager.recipientGroupSummaryFor(
			this.issuerSlug,
			this.groupSlug
		).then(s => s.detailLoadedPromise).then(
			group => this.recipientGroup = group,
			error => messageService.reportAndThrowError(`No Such Recipient Group ${this.issuerSlug} / ${this.groupSlug}`, error)
		);

		this.initMemberEditForm();
		this.initMemberCreateForm();
	}

	ngOnInit() {
		super.ngOnInit();
	}

	get issuerSlug() {
		return this.route.snapshot.params['issuerSlug'];
	}

	get groupSlug() {
		return this.route.snapshot.params['groupSlug'];
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Group Editing

	updateGroupActiveState(active: boolean) {
		this.recipientGroup.active = active;
		this.recipientGroup.save().then(
			() => this.messageService.reportMinorSuccess(
				`${active ? 'Activated' : 'Deactivated'} recipient group ${this.recipientGroup.name}`
			),
			error => this.messageService.reportAndThrowError(
				`Failed to ${active ? 'activate' : 'deactivate'} recipient group ${this.recipientGroup.name}`,
				error
			)
		)
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Member Deletion

	deleteMember(member: RecipientGroupMember) {
		this.dialogService.confirmDialog.openResolveRejectDialog({
			dialogTitle: "Delete Group Member",
			dialogBody: `Are you sure you want to delete ${member.memberName} from group ${this.recipientGroup.name}`,
			resolveButtonLabel: "Delete Member",
			rejectButtonLabel: "Cancel"
		}).then(
			() => {
				this.recipientGroup.members.remove(member);

				this.recipientGroup.save().then(
					() => this.messageService.reportMinorSuccess(
						`Deleted ${member.memberName} from group ${this.recipientGroup.name}`
					),
					error => this.messageService.reportAndThrowError(
						`Failed to delete ${member.memberName} from group ${this.recipientGroup.name}`,
						error
					)
				)
			},
			() => void 0 // Cancel
		);
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Member Editing

	get memberCreateFormControls() {
		return this.memberCreateForm.controls as any as RecipientMemberCreateForm<FormControl>;
	}

	protected initMemberEditForm(memberName: string = "") {
		this.memberEditForm = this.formBuilder.group({
			memberName: [ memberName, Validators.required ]
		} as RecipientMemberEditForm<any[]>);
	}

	get memberEditFormControls() {
		return this.memberCreateForm.controls as any as RecipientMemberEditForm<FormControl>;
	}

	editMember(member: RecipientGroupMember) {
		this.initMemberEditForm(member.memberName);

		this.editingMember = member;

		// Delay so the input has time to show up
		setTimeout(() => this.editMemberNameField && this.editMemberNameField.select());
	}

	submitMemberEdit(formState: RecipientMemberEditForm<string>) {
		if (! this.memberEditForm.valid) {
			markControlsDirty(this.memberEditForm);
			return;
		}

		const oldMemberName = this.editingMember.memberName;

		this.editingMember.memberName = formState.memberName;
		this.recipientGroup.save().then(
			() => {
				this.messageService.reportMinorSuccess(
					`Changed member name for ${this.editingMember.memberEmail} from '${oldMemberName}' to '${formState.memberName}'`
				);
				this.editingMember = null;
			},
			error => this.messageService.reportAndThrowError(
				`Failed to change member name for ${this.editingMember.memberEmail} from '${oldMemberName}' to '${formState.memberName}'`,
				error
			)
		);
	}

	cancelMemberEdit() {
		if (this.isEditingMember) {
			this.editingMember.revertChanges();
			this.editingMember = null;
		}
	}

	get isEditingMember(): boolean {
		return !! this.editingMember;
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Member Creation

	protected initMemberCreateForm() {
		this.memberCreateForm = this.formBuilder.group({
			memberName: [ '', Validators.required ],
			memberEmail: [ '', Validators.compose([
				Validators.required,
				EmailValidator.validEmail
			])]
		} as RecipientMemberCreateForm<any[]>);
	}

	submitMemberCreate(formState: RecipientMemberCreateForm<string>) {
		if (! this.memberCreateForm.valid) {
			markControlsDirty(this.memberCreateForm);
			return;
		}

		this.recipientGroup.addMember({
			name: formState.memberName,
			email: formState.memberEmail
		});

		this.recipientGroup.save().then(
			() => {
				this.messageService.reportMinorSuccess(
					`Added member ${formState.memberName} <${formState.memberEmail}> to the group`
				);
				this.initMemberCreateForm();
				this.memberCreateNameField.focus();
			},
			error => this.messageService.reportAndThrowError(
				`Failed to add member ${formState.memberName} <${formState.memberEmail}> to the group`
			)
		);
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Pathway Subscriptions

	removeSubscribedPathway(pathway: LearningPathway) {
		this.dialogService.confirmDialog.openResolveRejectDialog({
			dialogTitle: "Unsubscribe From Pathway",
			dialogBody: `Are you sure you want to unsubscribe recipient group ${this.recipientGroup.name} from pathway ${pathway.name}`,
			resolveButtonLabel: "Unsubscribe",
			rejectButtonLabel: "Cancel"
		}).then(
			() => {
				this.recipientGroup.subscribedPathways.remove(pathway);

				this.recipientGroup.save().then(
					() =>
						this.messageService.reportMinorSuccess(`Unsubscribed ${this.recipientGroup.name} from pathway ${pathway.name}`),
					error => this.messageService.reportAndThrowError(`Failed to unsubscribe ${this.recipientGroup.name} from pathway ${pathway.name}`,
						error)
				)
			},
			() => void 0 // Cancel
		);
	}

	private subscribeToPathway() {
		this.pathwayDialog.openDialog({
			dialogId: "recipient-group-subscribe",
			issuerSlug: this.issuerSlug,
			dialogTitle: "Add Pathways",
			multiSelectMode: true,
			selectedPathways: Array.from(this.recipientGroup.subscribedPathways.entities)
		}).then(
			newPathways => {
				this.recipientGroup.subscribedPathways.setTo(newPathways);
				this.recipientGroup.save().then(
					() => this.messageService.reportMinorSuccess(`Updated subscribed pathways for ${this.recipientGroup.name}`),
					error => this.messageService.reportAndThrowError(`Failed to update subscribed pathways for ${this.recipientGroup.name}`, error)
				);
			},
			cancel => void 0
		)
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Recipient Importing

	private importExistingRecipients() {
		this.recipientSelectionDialog.openDialog({
			dialogId: "recipient-group-include-members",
			issuerSlug: this.issuerSlug,
			dialogTitle: "Import Existing Recipients",
			multiSelectMode: true,
			selectedRecipients: [],
			excludedGroupUrls: [ this.recipientGroup.url ],
			excludedMemberEmails: this.recipientGroup.members.entities.map(m => m.memberEmail)
		}).then(
			newMembers => {
				newMembers.forEach(member => {
					this.recipientGroup.members.addOrUpdate(jsonCopy(member.apiModel));
				});

				this.recipientGroup.save().then(
					() => this.messageService.reportMinorSuccess(`Updated members for ${this.recipientGroup.name}`),
					error => this.messageService.reportAndThrowError(`Failed to import members into ${this.recipientGroup.name}`, error)
				);
			},
			cancel => void 0
		)
	}

}

interface RecipientMemberEditForm<T> {
	memberName: T;
}


interface RecipientMemberCreateForm<T> extends RecipientMemberEditForm<T> {
	memberEmail: T;
}
