import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SessionService } from "../../../common/services/session.service";
import { MessageService } from "../../../common/services/message.service";
import { Title } from "@angular/platform-browser";
import { BaseAuthenticatedRoutableComponent } from "../../../common/pages/base-authenticated-routable.component";
import { RecipientGroupManager } from "../../services/recipientgroup-manager.service";
import { ApiRecipientGroupForCreation } from "../../models/recipientgroup-api.model";
import { Issuer } from "../../models/issuer.model";
import { IssuerManager } from "../../services/issuer-manager.service";
import { markControlsDirty } from "../../../common/util/form-util";
import { AppConfigService } from "../../../common/app-config.service";

/**
 * Defines the fields in the form for this component. Can be used for type checking any type that exposes a property
 * per form field.
 */
interface RecipientGroupCreateForm<T> {
	recipientGroup_name: T;
	recipientGroup_description: T;
	alignment_url: T;
}

@Component({
	selector: 'recipientGroup-create',
	templateUrl: './recipientgroup-create.component.html'
})
export class RecipientGroupCreateComponent extends BaseAuthenticatedRoutableComponent implements OnInit {
	recipientGroupForm: FormGroup;
	creationSent: boolean = false;
	issuer: Issuer;

	issuerLoaded: Promise<any>;
	createGroupFinished: Promise<any>;

	constructor(
		loginService: SessionService,
		router: Router,
		route: ActivatedRoute,
		protected messageService: MessageService,
		protected title: Title,
		protected formBuilder: FormBuilder,
		protected recipientGroupManager: RecipientGroupManager,
		protected configService: AppConfigService,
		protected issuerManager: IssuerManager
	) {
		super(router, route, loginService);

		title.setTitle(`Create RecipientGroup - ${this.configService.theme['serviceName'] || "Badgr"}`);

		this.recipientGroupForm = formBuilder.group({
			recipientGroup_name:  [ '',
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(254)
                ])
			],
			recipientGroup_description: [ '', Validators.required ]
		} as RecipientGroupCreateForm<any[]>);

		this.issuerLoaded = issuerManager.issuerBySlug(this.issuerSlug).then(
			issuer => this.issuer = issuer,
			error => this.messageService.reportLoadingError(`Failed to load issuer ${this.issuerSlug}`, error)
		)
	}

	get controls(): RecipientGroupCreateForm<FormControl> {
		return this.recipientGroupForm.controls as any;
	}

	get issuerSlug() { return this.route.snapshot.params['issuerSlug']; }

	ngOnInit() {
		super.ngOnInit();
	}

	onSubmit(formState: RecipientGroupCreateForm<string>) {
		let newRecipientGroupData = {
			name: formState.recipientGroup_name,
			description: formState.recipientGroup_description,
			alignmentUrl: formState.alignment_url,
			members: [],
			pathways: []
		} as ApiRecipientGroupForCreation;

		this.createGroupFinished = this.recipientGroupManager.createRecipientGroup(this.issuerSlug, newRecipientGroupData).then(
			createdRecipientGroup => {
				this.router.navigate([
					'issuer/issuers', this.issuerSlug, 'recipient-groups', createdRecipientGroup.slug
				]);
				this.messageService.reportMinorSuccess("RecipientGroup created successfully.");
			},
			error => {
				this.messageService.reportAndThrowError(`Unable to create recipientGroup`, error);
			}).then(() => this.createGroupFinished = null)
	}

	createRecipientGroup(ev) {
		if (!this.recipientGroupForm.valid && !this.creationSent) {
			this.creationSent = true;

			markControlsDirty(this.recipientGroupForm);

			ev.preventDefault();
		}
	}
}
