import { Component, Input } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { UrlValidator } from "../../../common/validators/url.validator";
import { PathwayDetailComponent } from "../pathway-detail/pathway-detail.component";
import { LearningPathwayElement } from "../../models/pathway.model";
import { MessageService } from "../../../common/services/message.service";
import { BadgeSelectionDialogOptions } from "../badge-selection-dialog/badge-selection-dialog.component";
import { BadgeClassManager } from "../../services/badgeclass-manager.service";
import { ApiElementRequirementJunctionType } from "../../models/pathway-api.model";
import { BadgeClassRef, BadgeClassSlug, BadgeClassUrl } from "../../models/badgeclass-api.model";
import { markControlsDirty } from "../../../common/util/form-util";
import { Router } from "@angular/router";

@Component({
	selector: 'pathway-element',
	host: {
		// The root element only shows children, and does not generally act like a normal pathway element
		'[class.pathway]': "! isRootElement",
		'[class.pathway-is-inactivemove]': "isMoveInProgress && !isThisElementMoving",
		'[class.pathway-is-activemove]': "isThisElementMoving",

		// The root element acts as a vertical container for it's children, nothing more.
		'[class.l-childrenvertical]': "isRootElement",
	},
	templateUrl: './pathway-element.component.html'
})
export class PathwayElementComponent {

	get issuer() { return this.pathwayComponent.issuer }

	get issuerSlug() { return this.pathwayComponent.issuerSlug }

	get pathwaySlug() { return this.pathwayComponent.pathwaySlug }


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Completion Badge Management

	get completionBadgeRef() { return this.pathwayElement.completionBadge.entityRef; }

	set completionBadgeRef(ref: BadgeClassRef) {
		this.pathwayElement.completionBadge.entityRef = ref;

		this.saveElement(this.pathwayElement,
			`Updated completion badge for ${this.pathwayElement.name}`,
			`Failed to update completion badge for ${this.pathwayElement.name}`);
	}


	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Requirement Management
	get isRequiredForParentCompletion(): boolean {
		return this.pathwayElement.requiredForParentCompletion;
	}

	get hasBadgeRequirements(): boolean {
		return (this.requiredBadgeIds || []).length > 0;
	}

	get hasChildElementRequirements(): boolean {
		return this.pathwayElement.children.length > 0
	}

	get hasMultipleRequirements(): boolean {
		return (
				this.pathwayElement.requirements.requiredBadgeIds
				|| this.pathwayElement.requirements.requiredElementIds
				|| []
			).length > 1;
	}

	get hasRequirements(): boolean {
		return this.hasBadgeRequirements || this.hasChildElementRequirements;
	}

	get requirementJunctionType() { return this.pathwayElement.requirements.junctionType }

	set requirementJunctionType(type: ApiElementRequirementJunctionType) {
		this.pathwayElement.requirements.junctionType = type;
		this.saveElement(this.pathwayElement,
			`Updated requirements for ${this.pathwayElement.name}`,
			`Failed to update requirements for ${this.pathwayElement.name}`);
	}

	get requiredBadgeIds() { return this.pathwayElement.requirements.requiredBadgeIds; }

	set requiredBadgeIds(ids: BadgeClassUrl[]) {
		this.pathwayElement.requirements.requiredBadgeIds = ids;
		this.saveElement(this.pathwayElement,
			`Updated required badges for ${this.pathwayElement.name}`,
			`Failed to update required badges for ${this.pathwayElement.name}`);
	}

	set isRequiredForParentCompletion(required: boolean) {
		if (required !== this.isRequiredForParentCompletion) {
			if (required) {
				this.pathwayElement.requiredForParentCompletion = true;
				this.saveElement(
					this.pathwayElement.parentElement,
					`Marked ${this.pathwayElement.name} as required`,
					`Failed to mark ${this.pathwayElement.name} as required`
				);
			} else {
				this.pathwayElement.requiredForParentCompletion = false;
				this.saveElement(
					this.pathwayElement.parentElement,
					`Marked ${this.pathwayElement.name} as not required`,
					`Failed to mark ${this.pathwayElement.name} as not required`
				);
			}
		}
	}

	get createControls(): PathwayElementForm<FormControl> {
		return this.elementCreateForm.controls as any;
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Element Moving
	get isThisElementMoving() {
		return this.pathwayComponent && this.pathwayComponent.movingElement === this.pathwayElement;
	}

	get isMoveInProgress() {
		return this.pathwayComponent && this.pathwayComponent.isElementMoving;
	}
	@Input() pathwayComponent: PathwayDetailComponent;

	@Input() isRootElement: boolean;
	@Input() elementDisplayDepth: number = 0;

	@Input() pathwayElement: LearningPathwayElement;

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Child Creation
	isAddingChild: boolean = false;
	elementCreateForm: FormGroup;

	constructor(
		protected formBuilder: FormBuilder,
		protected messageService: MessageService,
		protected badgeManager: BadgeClassManager,
		protected router: Router
	) {
		this.setupCreateForm();
	}

	openCompletionBadgeDialog() {
		let dialogOptions: BadgeSelectionDialogOptions = {
			dialogId: "pathwayCompletionBadge",
			dialogTitle: "Select Completion Badge",
			multiSelectMode: false,
			restrictToIssuerId: this.issuer.issuerUrl
		};

		const assignSelection = selection => this.completionBadgeRef = selection.length ? selection[ 0 ].ref : null;

		if (this.completionBadgeRef) {
			this.badgeManager.badgeByRef(this.completionBadgeRef).then(
				badge => this.pathwayComponent.badgeSelectionDialog.openDialog(
					Object.assign(dialogOptions, { selectedBadges: [ badge ] })
				).then(assignSelection),
				err => this.messageService.reportAndThrowError(`Failed to load completion badge: ${this.completionBadgeRef}`)
			)
		} else {
			this.pathwayComponent.badgeSelectionDialog
				.openDialog(dialogOptions)
				.then(assignSelection)
		}
	}

	removeCompletionBadge() {
		this.pathwayComponent.confirmDialog
			.openResolveRejectDialog({
				dialogTitle: "Remove Completion Badge?",
				dialogBody: `Are you sure you want to remove ${this.badgeNameForRef(this.completionBadgeRef)} as the completion badge from ${this.pathwayElement.name}?`,
				resolveButtonLabel: "Remove Completion Badge",
				rejectButtonLabel: "Cancel"
			})
			.then(() => {
				this.pathwayElement.completionBadge.entityRef = null;
				this.saveElement(
					this.pathwayElement,
					`Removed completion badge from ${this.pathwayElement.name}`,
					`Failed to remove completion badge from ${this.pathwayElement.name}`
				);
			}, _ => false /* Canceled */);
	}

	removeRequiredBadgeId(badgeId: BadgeClassUrl) {
		return this.removeRequiredBadge(badgeId);
	}

	removeRequiredBadge(badgeId: BadgeClassUrl) {
		this.pathwayComponent.confirmDialog
			.openResolveRejectDialog({
				dialogTitle: "Remove Required Badge?",
				dialogBody: `Are you sure you want to remove ${this.badgeNameForRef(badgeId)} as a requirement from ${this.pathwayElement.name}?`,
				resolveButtonLabel: "Remove Badge",
				rejectButtonLabel: "Cancel"
			})
			.then(() => {
				this.requiredBadgeIds.splice(this.requiredBadgeIds.indexOf(badgeId), 1);
				this.saveElement(this.pathwayElement,
					`Updated required badges for ${this.pathwayElement.name}`,
					`Failed to update required badges for ${this.pathwayElement.name}`);
			}, _ => false /* Canceled */)
	}

	openRequiredBadgeDialog() {
		this.badgeManager.badgesByUrls(
			this.requiredBadgeIds
		).then(
			badges => this.pathwayComponent.badgeSelectionDialog.openDialog(
				{
					dialogId: "pathwayRequiredBadges",
					dialogTitle: "Select Required Badges",
					multiSelectMode: true,
					omittedBadges: badges
				}
			).then(selectedBadges => this.requiredBadgeIds = [].concat(badges, selectedBadges).map(b => b.badgeUrl)),
			err => this.messageService.reportAndThrowError(`Failed to load required badges: ${this.requiredBadgeIds}`)
		)
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Element Deletion
	deleteElement() {
		this.pathwayComponent.confirmDialog
			.openResolveRejectDialog(
				this.hasChildElementRequirements ? {
					dialogTitle: `Delete Element ${this.pathwayElement.name} and All Children?`,
					dialogBody: `Are you sure you want to delete element ${this.pathwayElement.name} and all it's child elements? This action cannot be undone.`,
					resolveButtonLabel: `Delete Element and Children`,
					rejectButtonLabel: "Cancel"
				} : {
					dialogTitle: `Delete Element ${this.pathwayElement.name}?`,
					dialogBody: `Are you sure you want to delete element ${this.pathwayElement.name}? This action cannot be undone.`,
					resolveButtonLabel: `Delete Element`,
					rejectButtonLabel: "Cancel"
				}
			)
			.then(() => {
				this.pathwayElement
					.deleteElement()
					.then(
						newChild => this.messageService.reportMinorSuccess(
							`Deleted '${this.pathwayElement.name}' from '${this.pathwayElement.parentElement.name}'`
						),
						failure => this.messageService.reportAndThrowError(
							`Failed to delete element '${this.pathwayElement.name}'`, failure
						)
					);
			}, _ => false /* Canceled */);
	}

	beginAddingChild() {
		this.setupCreateForm();
		this.isAddingChild = true;
	}

	cancelCreating() {
		this.isAddingChild = false;
	}

	submitCreate(formState: PathwayElementForm<string>) {
		this.pathwayElement
			.addChild({
				name: formState.element_name,
				description: formState.element_description,
				alignmentUrl: (formState.alignment_url && formState.alignment_url.length)
					? formState.alignment_url
					: null
			})
			.then(
				newChild => {
					this.messageService.reportMinorSuccess(
						`Created '${newChild.name}' as a child of '${this.pathwayElement.name}'`
					);
					this.isAddingChild = false;

					this.setupCreateForm();
				},
				failure => this.messageService.reportAndThrowError(
					`Failed to create new child '${formState.element_name}'`, failure
				)
			);
	}

	validateCreateForm(ev) {
		if (!this.elementCreateForm.valid) {
			ev.preventDefault();
			markControlsDirty(this.elementCreateForm);
		}
	}

	postProcessCreateUrl() {
		UrlValidator.addMissingHttpToControl(this.createControls.alignment_url);
	}

	isValidMoveTarget(afterElem: LearningPathwayElement) {
		return this.pathwayComponent && !this.hasBadgeRequirements && this.pathwayComponent.checkValidMoveTarget(this.pathwayElement,
				afterElem);
	}

	startElementMove() {
		this.pathwayComponent.startElementMove(this.pathwayElement);
	}

	cancelElementMove() {
		this.pathwayComponent.cancelElementMove();
	}

	moveElementAfterChild(child: LearningPathwayElement) {
		this.pathwayComponent.doElementMove(this.pathwayElement, child)
	}

	private badgeNameForRef(badgeRef: BadgeClassRef | BadgeClassUrl) {
		let badge = this.badgeManager.loadedBadgeByRef(badgeRef);
		return badge ? badge.name : 'this badge';
	}

	private badgeNameForSlug(badgeSlug: BadgeClassSlug) {
		let badge = this.badgeManager.loadedBadgeByIssuerIdAndSlug(this.issuer.issuerUrl, badgeSlug);
		return badge ? badge.name : 'this badge';
	}

	private saveElement(
		element: LearningPathwayElement,
		successMessage: string,
		failureMessage: string
	) {
		element.save().then(
			success => this.messageService.reportMinorSuccess(successMessage),
			failure => this.messageService.reportAndThrowError(failureMessage)
		)
	}

	private setupCreateForm() {
		this.elementCreateForm = this.formBuilder.group({
			element_name: [ '', Validators.required ],
			element_description: [ '', Validators.required ],
			alignment_url: [ '', Validators.compose([ UrlValidator.validUrl ]) ]
		} as PathwayElementForm<any[]>);
	}
}

interface PathwayElementForm<T> {
	element_name: T;
	element_description: T;
	alignment_url: T;
}
