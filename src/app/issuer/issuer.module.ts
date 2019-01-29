import {NgModule} from "@angular/core";
// import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";

import {BadgrCommonModule, COMMON_IMPORTS} from "../common/badgr-common.module";
import {IssuerListComponent} from "./components/issuer-list/issuer-list.component";
import {IssuerCreateComponent} from "./components/issuer-create/issuer-create.component";
import {IssuerDetailComponent} from "./components/issuer-detail/issuer-detail.component";
import {IssuerEditComponent} from "./components/issuer-edit/issuer-edit.component";
import {BadgeClassCreateComponent} from "./components/badgeclass-create/badgeclass-create.component";
import {BadgeClassEditComponent} from "./components/badgeclass-edit/badgeclass-edit.component";
import {BadgeClassDetailComponent} from "./components/badgeclass-detail/badgeclass-detail.component";
import {BadgeClassIssueComponent} from "./components/badgeclass-issue/badgeclass-issue.component";
import {BadgeClassIssueBulkAwardComponent} from "./components/badgeclass-issue-bulk-award/badgeclass-issue-bulk-award.component";
import {BadgeClassIssueBulkAwardPreviewComponent} from "./components/badgeclass-issue-bulk-award-preview/badgeclass-issue-bulk-award-preview.component";
import {BadgeclassIssueBulkAwardConformation} from "./components/badgeclass-issue-bulk-award-confirmation/badgeclass-issue-bulk-award-confirmation.component";
import {BadgeclassIssueBulkAwardError} from "./components/badgeclass-issue-bulk-award-error/badgeclass-issue-bulk-award-error.component";
import {PathwayCreateComponent} from "./components/pathway-create/pathway-create.component";
import {PathwayDetailComponent} from "./components/pathway-detail/pathway-detail.component";
import {RecipientGroupCreateComponent} from "./components/recipientgroup-create/recipientgroup-create.component";
import {RecipientGroupDetailComponent} from "./components/recipientgroup-detail/recipientgroup-detail.component";
import {RecipientGroupImportCSV} from "./components/recipientgroup-import-csv/recipientgroup-import-csv.component";
import {RecipientGroupManager} from "./services/recipientgroup-manager.service";
import {PathwayManager} from "./services/pathway-manager.service";
import {PathwayApiService} from "./services/pathway-api.service";
import {BadgeInstanceManager} from "./services/badgeinstance-manager.service";
import {BadgeInstanceApiService} from "./services/badgeinstance-api.service";
import {BadgeClassManager} from "./services/badgeclass-manager.service";
import {BadgeClassApiService} from "./services/badgeclass-api.service";
import {IssuerManager} from "./services/issuer-manager.service";
import {RecipientGroupApiService} from "./services/recipientgroup-api.service";
import {IssuerApiService} from "./services/issuer-api.service";
import {BadgeSelectionDialog} from "./components/badge-selection-dialog/badge-selection-dialog.component";
import {PathwayElementComponent} from "./components/pathway-element/pathway-element.component";
import {PathwayElementEditForm} from "./components/pathway-element-edit-form/pathway-element-edit-form.component";
import {RecipientGroupSelectionDialog} from "./components/recipientgroup-selection-dialog/recipientgroup-selection-dialog.component";
import {PathwaySelectionDialog} from "./components/pathway-selection-dialog/pathway-selection-dialog.component";
import {RecipientGroupEditForm} from "./components/recipientgroup-edit-form/recipientgroup-edit-form.component";
import {RecipientSelectionDialog} from "./components/recipient-selection-dialog/recipient-selection-dialog.component";
import {BadgeStudioComponent} from "./components/badge-studio/badge-studio.component";
import {PathwayGroupSubscriptionComponent} from "./components/pathway-group-subscription/pathway-group-subscription.component";
import {BadgeClassIssueBulkAwardImportComponent} from "./components/badgeclass-issue-bulk-award-import/badgeclass-issue-bulk-award-import.component";
import {CommonEntityManagerModule} from "../entity-manager/entity-manager.module";
import {IssuerStaffComponent} from "./components/issuer-staff/issuer-staff.component";
import {BadgeClassEditFormComponent} from "./components/badgeclass-edit-form/badgeclass-edit-form.component";

const routes = [
	/* Issuer */
	{
		path: "",
		component: IssuerListComponent
	},
	{
		path: "create",
		component: IssuerCreateComponent
	},
	{
		path: "issuers/:issuerSlug",
		component: IssuerDetailComponent
	},
	{
		path: "issuers/:issuerSlug/edit",
		component: IssuerEditComponent
	},
	{
		path: "issuers/:issuerSlug/staff",
		component: IssuerStaffComponent
	},
	{
		path: "issuers/:issuerSlug/badges/create",
		component: BadgeClassCreateComponent
	},
	{
		path: "issuers/:issuerSlug/badges/:badgeSlug",
		component: BadgeClassDetailComponent
	},
	{
		path: "issuers/:issuerSlug/badges/:badgeSlug/edit",
		component: BadgeClassEditComponent
	},
	{
		path: "issuers/:issuerSlug/badges/:badgeSlug/issue",
		component: BadgeClassIssueComponent
	},
	{
		path: "issuers/:issuerSlug/badges/:badgeSlug/bulk-import",
		component: BadgeClassIssueBulkAwardComponent
	},
	{
		path: "issuers/:issuerSlug/pathways/create",
		component: PathwayCreateComponent
	},
	{
		path: "issuers/:issuerSlug/pathways/:pathwaySlug/elements/:elementSlug",
		component: PathwayDetailComponent
	},
	{
		path: "issuers/:issuerSlug/pathways/:pathwaySlug/subscribed-groups",
		component: PathwayGroupSubscriptionComponent
	},
	{
		path: "issuers/:issuerSlug/recipient-groups/create",
		component: RecipientGroupCreateComponent
	},
	{
		path: "issuers/:issuerSlug/recipient-groups/:groupSlug",
		component: RecipientGroupDetailComponent
	},
	{
		path: "issuers/:issuerSlug/recipient-groups/:groupSlug/csv-import",
		component: RecipientGroupImportCSV
	},
	{
		path: "**",
		component: IssuerListComponent
	},
];

@NgModule({
	imports: [
		...COMMON_IMPORTS,
		BadgrCommonModule,
		CommonEntityManagerModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		BadgeClassCreateComponent,
		BadgeClassEditComponent,
		BadgeClassEditFormComponent,
		BadgeClassDetailComponent,
		BadgeClassIssueComponent,

		BadgeClassIssueBulkAwardComponent,
		BadgeClassIssueBulkAwardImportComponent,
		BadgeClassIssueBulkAwardPreviewComponent,
		BadgeclassIssueBulkAwardError,
		BadgeclassIssueBulkAwardConformation,

		BadgeClassDetailComponent,
		BadgeClassIssueComponent,
		BadgeSelectionDialog,
		BadgeStudioComponent,

		IssuerCreateComponent,
		IssuerDetailComponent,
		IssuerEditComponent,
		IssuerStaffComponent,
		IssuerListComponent,

		PathwayCreateComponent,
		PathwayDetailComponent,
		PathwayGroupSubscriptionComponent,
		PathwayElementComponent,
		PathwayElementEditForm,
		PathwaySelectionDialog,

		RecipientGroupCreateComponent,
		RecipientGroupDetailComponent,
		RecipientGroupEditForm,
		RecipientGroupSelectionDialog,
		RecipientSelectionDialog,
		RecipientGroupImportCSV,
	],
	exports: [],
	providers: [
		BadgeClassApiService,
		BadgeClassManager,
		BadgeInstanceApiService,
		BadgeInstanceManager,
		IssuerApiService,
		IssuerManager,
		PathwayApiService,
		PathwayManager,
		RecipientGroupApiService,
		RecipientGroupManager,
	]
})
export class IssuerModule {}
