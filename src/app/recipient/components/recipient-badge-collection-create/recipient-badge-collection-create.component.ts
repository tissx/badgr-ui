import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { ApiRecipientBadgeCollectionForCreation } from "../../models/recipient-badge-collection-api.model";
import { markControlsDirty } from "../../../common/util/form-util";
import { BaseAuthenticatedRoutableComponent } from "../../../common/pages/base-authenticated-routable.component";
import { SessionService } from "../../../common/services/session.service";
import { MessageService } from "../../../common/services/message.service";
import { AppConfigService } from "../../../common/app-config.service";
import { RecipientBadgeCollectionManager } from "../../services/recipient-badge-collection-manager.service";

@Component({
	selector: 'create-recipient-badge-collection',
	template: `
		<main>
			<form-message></form-message>
			<header class="l-containerxaxis topbar">
				<h3 class="topbar-x-heading">Add Badge Collection</h3>
				<p class="topbar-x-subheading">Adding a collection allows your to organize your badges.</p>
			</header>
			<div class="l-containerxaxis u-margin-yaxis3x u-width-formsmall">
				<form [formGroup]="badgeCollectionForm"
				      (ngSubmit)="onSubmit(badgeCollectionForm.value)"
				      novalidate>
					<fieldset
						aria-labelledby="heading-add-badge-collection"
						role="group">
						<legend class="visuallyhidden" id="heading-add-badge-collection">Add Badge Collection</legend>
					 	<bg-formfield-text
					 		[control]="badgeCollectionForm.controls.collectionName"
		                    [label]="'Name'"
		                    [errorMessage]="{required:'Please enter a collection name'}"
		                    [autofocus]="true"
		                    [sublabel]="'Max 128 characters'">
	                    </bg-formfield-text>
	                    <div class="u-margin-top2x">
							<bg-formfield-text
								[control]="badgeCollectionForm.controls.collectionDescription"
			                    [label]="'Description'"
		                        [errorMessage]="{required: 'Please enter a description'}"
			                    [multiline]="true"
			                    [sublabel]="'Max 255 characters'">
	                        </bg-formfield-text>
                        </div>
						<div class="l-flex l-flex-1x l-flex-justifyend u-margin-top2x">
							<a [routerLink]="['/recipient/badge-collections']"
							   class="button button-secondary"
							   [disabled-when-requesting]="true"
							>Cancel</a>
							<button type="submit"
							        class="button"
							        [disabled]="!! createCollectionPromise"
							        (click)="clickSubmit($event)"
							        [loading-promises]="[ createCollectionPromise ]"
							        loading-message="Adding"
							>Add Collection</button>
						</div>
					</fieldset>
				</form>
			</div>
		</main>
		`
})
export class RecipientBadgeCollectionCreateComponent extends BaseAuthenticatedRoutableComponent implements OnInit {
	badgeCollectionForm: FormGroup;
	createCollectionPromise: Promise<any>;

	constructor(
		router: Router,
		route: ActivatedRoute,
		loginService: SessionService,
		private formBuilder: FormBuilder,
		private title: Title,
		private messageService: MessageService,
		private configService: AppConfigService,
		private recipientBadgeCollectionManager: RecipientBadgeCollectionManager
	) {
		super(router, route, loginService);

		title.setTitle(`Create Collection - ${this.configService.theme['serviceName'] || "Badgr"}`);

		this.badgeCollectionForm = this.formBuilder.group({
			collectionName: [ '',
                Validators.compose([
                	Validators.required,
	                Validators.maxLength(128)
				])
			],
			collectionDescription: [
				'',
				Validators.compose([
					Validators.required,
					Validators.maxLength(255)
				])
			]
		} as CreateBadgeCollectionForm<any[]>);
	}

	ngOnInit() {
		super.ngOnInit();
	}

	onSubmit(formState: CreateBadgeCollectionForm<string>) {
		const collectionForCreation: ApiRecipientBadgeCollectionForCreation = {
			name: formState.collectionName,
			description: formState.collectionDescription,
			published: false,
			badges: []
		};

		this.createCollectionPromise = this.recipientBadgeCollectionManager.createRecipientBadgeCollection(
			collectionForCreation
		).then((collection) => {
			this.router.navigate([ '/recipient/badge-collections/collection', collection.slug ]);
			this.messageService.reportMinorSuccess("Collection created successfully.");
		}, error => {
			this.messageService.reportHandledError("Unable to create collection", error);
		}).then(() => this.createCollectionPromise = null);
	}

	clickSubmit(ev) {
		if (!this.badgeCollectionForm.valid) {
			ev.preventDefault();
			markControlsDirty(this.badgeCollectionForm);
		}
	}
}

interface CreateBadgeCollectionForm<T> {
	collectionName: T;
	collectionDescription: T;
}
