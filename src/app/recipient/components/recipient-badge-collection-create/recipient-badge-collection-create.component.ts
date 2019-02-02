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
	templateUrl: './recipient-badge-collection-create.component.html'
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
