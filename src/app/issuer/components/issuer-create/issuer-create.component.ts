import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "../../../common/services/message.service";
import {IssuerManager} from "../../services/issuer-manager.service";
import {BaseAuthenticatedRoutableComponent} from "../../../common/pages/base-authenticated-routable.component";
import {UrlValidator} from "../../../common/validators/url.validator";
import {Title} from "@angular/platform-browser";
import {ApiIssuerForCreation} from "../../models/issuer-api.model";
import {markControlsDirty} from "../../../common/util/form-util";
import {SessionService} from "../../../common/services/session.service";
import {preloadImageURL} from "../../../common/util/file-util";
import {UserProfileManager} from "../../../common/services/user-profile-manager.service";
import {UserProfileEmail} from "../../../common/model/user-profile.model";
import {FormFieldSelectOption} from "../../../common/components/formfield-select";
import {AppConfigService} from "../../../common/app-config.service";

@Component({
	selector: 'issuer-create',
	templateUrl: './issuer-create.component.html'
})
export class IssuerCreateComponent extends BaseAuthenticatedRoutableComponent implements OnInit {
	readonly issuerImagePlacholderUrl = preloadImageURL(require('../../../../breakdown/static/images/placeholderavatar-issuer.svg'));

	issuerForm: FormGroup;
	emails: UserProfileEmail[];
	emailsOptions: FormFieldSelectOption[];
	addIssuerFinished: Promise<any>;
	emailsLoaded: Promise<any>;

	constructor(
		loginService: SessionService,
		router: Router,
		route: ActivatedRoute,
		protected configService: AppConfigService,
		protected profileManager: UserProfileManager,
		protected formBuilder: FormBuilder,
		protected title: Title,
		protected messageService: MessageService,
		protected issuerManager: IssuerManager
	) {
		super(router, route, loginService);
		title.setTitle(`Create Issuer - ${this.configService.theme['serviceName'] || "Badgr"}`);

		this.issuerForm = formBuilder.group({
			'issuer_name': [
				'',
				Validators.compose([
					Validators.required,
					Validators.maxLength(1024)
				])
			],
			'issuer_description': [
				'',
				Validators.compose([
					Validators.required,
					Validators.maxLength(1024)
				])
			],
			'issuer_email': [
				'',
				Validators.compose([
					Validators.required,
					/*Validators.maxLength(75),
					EmailValidator.validEmail*/
				])
			],
			'issuer_url': [
				'',
				Validators.compose([
					Validators.required,
					UrlValidator.validUrl
				])
			],
			'issuer_image': [ '' ],
			'agreedTerms': [false, Validators.requiredTrue],
		});

		this.emailsLoaded = this.profileManager.userProfilePromise
			.then(profile => profile.emails.loadedPromise)
			.then(emails => {
				this.emails = emails.entities.filter(e => e.verified);
				this.emailsOptions = this.emails.map((e) => {
					return {
						label: e.email,
						value: e.email,
					}
				});
			});
	}

	ngOnInit() {
		super.ngOnInit();
	}

	onSubmit(formState) {
		var issuer: ApiIssuerForCreation = {
			'name': formState.issuer_name,
			'description': formState.issuer_description,
			'email': formState.issuer_email,
			'url': formState.issuer_url,
		};

		if (formState.issuer_image && String(formState.issuer_image).length > 0) {
			issuer.image = formState.issuer_image;
		}

		this.addIssuerFinished = this.issuerManager.createIssuer(issuer).then((new_issuer) => {
			this.router.navigate([ 'issuer/issuers', new_issuer.slug ]);
			this.messageService.setMessage("Issuer created successfully.", "success");
		}, error => {
			this.messageService.setMessage("Unable to create issuer: " + error, "error");
		}).then(() => this.addIssuerFinished = null);
	}

	clickSubmit(ev) {
		if (!this.issuerForm.valid) {
			ev.preventDefault();
			markControlsDirty(this.issuerForm);
		}
	}

	urlBlurred(ev) {
		var control: FormControl = <FormControl>this.issuerForm.controls[ 'issuer_url' ];
		UrlValidator.addMissingHttpToControl(control);
	}

	get dataProcessorUrl() {
		return this.configService.theme['dataProcessorTermsLink'] || 'https://badgr.com/en-us/data-processing.html';
	}
}
