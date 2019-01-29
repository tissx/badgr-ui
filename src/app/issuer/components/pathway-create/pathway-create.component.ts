import { Component, OnInit } from "@angular/core";

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { SessionService } from "../../../common/services/session.service";
import { MessageService } from "../../../common/services/message.service";
import { Title } from "@angular/platform-browser";
import { UrlValidator } from "../../../common/validators/url.validator";
import { BaseAuthenticatedRoutableComponent } from "../../../common/pages/base-authenticated-routable.component";
import { ApiPathwaySummaryForCreation } from "../../models/pathway-api.model";
import { PathwayManager } from "../../services/pathway-manager.service";
import { IssuerManager } from "../../services/issuer-manager.service";
import { Issuer } from "../../models/issuer.model";
import { markControlsDirty } from "../../../common/util/form-util";
import { AppConfigService } from "../../../common/app-config.service";

/**
 * Defines the fields in the form for this component. Can be used for type checking any type that exposes a property
 * per form field.
 */
interface PathwayCreateForm<T> {
	pathway_name: T;
	pathway_description: T;
	alignment_url: T;
}

@Component({
	selector: 'pathway-create',
	templateUrl: './pathway-create.component.html'
})
export class PathwayCreateComponent extends BaseAuthenticatedRoutableComponent implements OnInit {
	pathwayForm: FormGroup;
	creationSent: boolean = false;
	issuer: Issuer;

	constructor(
		loginService: SessionService,
		router: Router,
		route: ActivatedRoute,
		protected messageService: MessageService,
		protected title: Title,
		protected formBuilder: FormBuilder,
		protected pathwayManager: PathwayManager,
		protected configService: AppConfigService,
		protected issuerManager: IssuerManager
	) {
		super(router, route, loginService);

		title.setTitle(`Create Pathway - ${this.configService.theme['serviceName'] || "Badgr"}`);

		this.pathwayForm = formBuilder.group({
			pathway_name: [ '',
			                Validators.compose([
				                Validators.required,
				                Validators.maxLength(128)
			                ])
			],
			pathway_description: [ '',
			                       Validators.compose([
				                       Validators.required,
				                       Validators.maxLength(255)
			                       ])
			],
			alignment_url: [ '', Validators.compose([ UrlValidator.validUrl ]) ]
		} as PathwayCreateForm<any[]>);

		issuerManager.issuerBySlug(this.issuerSlug).then(
			issuer => this.issuer = issuer,
			error => this.messageService.reportLoadingError(`Failed to load issuer ${this.issuerSlug}`, error)
		)
	}

	get controls(): PathwayCreateForm<FormControl> {
		return this.pathwayForm.controls as any;
	}

	get issuerSlug() {
		return this.route.snapshot.params['issuerSlug'];
		;
	}

	postProcessUrl() {
		let control: FormControl = this.controls.alignment_url;
		UrlValidator.addMissingHttpToControl(control);
	}

	ngOnInit() {
		super.ngOnInit();
	}

	onSubmit(formState: PathwayCreateForm<string>) {
		let newPathwayData = {
			name: formState.pathway_name,
			description: formState.pathway_description,
			alignmentUrl: formState.alignment_url || null
		} as ApiPathwaySummaryForCreation;

		this.pathwayManager.createPathway(this.issuerSlug, newPathwayData).then(createdPathway => {
			this.router.navigate([
				'issuer/issuers', this.issuerSlug, 'pathways', createdPathway.slug, 'elements', createdPathway.slug
			]);
			this.messageService.setMessage("Pathway created successfully.", "success");
		}, error => {
			this.messageService.setMessage(`Unable to create pathway: ${error}`, "error");
		})
	}

	createPathway(ev) {
		if (!this.pathwayForm.valid) {
			ev.preventDefault();
			markControlsDirty(this.pathwayForm);
		}
	}
}
