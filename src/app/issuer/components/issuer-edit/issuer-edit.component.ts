import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {BaseAuthenticatedRoutableComponent} from '../../../common/pages/base-authenticated-routable.component';

import {SessionService} from '../../../common/services/session.service';
import {MessageService} from '../../../common/services/message.service';
import {IssuerManager} from '../../services/issuer-manager.service';
import {UrlValidator} from '../../../common/validators/url.validator';
import {Title} from '@angular/platform-browser';
import {ApiIssuerForEditing} from '../../models/issuer-api.model';
import {markControlsDirty} from '../../../common/util/form-util';
import {Issuer} from '../../models/issuer.model';

import {preloadImageURL} from '../../../common/util/file-util';
import {FormFieldSelectOption} from '../../../common/components/formfield-select';
import {UserProfileManager} from '../../../common/services/user-profile-manager.service';
import {UserProfileEmail} from '../../../common/model/user-profile.model';
import {AppConfigService} from '../../../common/app-config.service';
import {LinkEntry} from '../../../common/components/bg-breadcrumbs/bg-breadcrumbs.component';

@Component({
	selector: 'issuer-edit',
	templateUrl: './issuer-edit.component.html',
})
export class IssuerEditComponent extends BaseAuthenticatedRoutableComponent implements OnInit {
	readonly issuerImagePlacholderUrl = preloadImageURL(require('../../../../breakdown/static/images/placeholderavatar-issuer.svg'));
	
	issuer: Issuer;
	issuerSlug: string;

	issuerForm: FormGroup;
	emails: UserProfileEmail[];
	emailsOptions: FormFieldSelectOption[];

	editIssuerFinished: Promise<any>;
	emailsLoaded: Promise<any>;
	issuerLoaded: Promise<any>;

	editIssuerCrumbs: LinkEntry[];

	constructor(
		loginService: SessionService,
		router: Router,
		route: ActivatedRoute,
		protected profileManager: UserProfileManager,
		protected formBuilder: FormBuilder,
		protected title: Title,
		protected messageService: MessageService,
		protected configService: AppConfigService,
		protected issuerManager: IssuerManager
	) {
		super(router, route, loginService);
		title.setTitle(`Edit Issuer - ${this.configService.theme['serviceName'] || "Badgr"}`);

		this.issuerSlug = this.route.snapshot.params['issuerSlug'];

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
		} as issuerForm<any[]>);
		this.issuerLoaded = this.issuerManager.issuerBySlug(this.issuerSlug).then(
			(issuer) => {
				this.issuer = issuer;

				this.editIssuerCrumbs = [{title: "Issuers", routerLink: ['/issuer']},
										{title: issuer.name, routerLink: ['/issuer/issuers/', this.issuerSlug]},
										{title: 'Edit Issuer'}];


				this.editControls.issuer_name.setValue(this.issuer.name, { emitEvent: false });
				this.editControls.issuer_description.setValue(this.issuer.description, { emitEvent: false });
				this.editControls.issuer_email.setValue(this.issuer.email, { emitEvent: false });
				this.editControls.issuer_url.setValue(this.issuer.websiteUrl, { emitEvent: false });
				this.editControls.issuer_image.setValue(this.issuer.image, { emitEvent: false });

				this.title.setTitle(`Issuer - ${this.issuer.name} - ${this.configService.theme['serviceName'] || "Badgr"}`);

				/*this.badgesLoaded = new Promise((resolve, reject) => {
					this.badgeClassService.badgesByIssuerUrl$.subscribe(
						badgesByIssuer => {
							this.badges = badgesByIssuer[this.issuer.issuerUrl];
							resolve();
						},
						error => {
							this.messageService.reportAndThrowError(
								`Failed to load badges for ${this.issuer ? this.issuer.name : this.issuerSlug}`, error
							);
							resolve();
						}
					);
				});*/
			}, error => {
				this.messageService.reportLoadingError(`Issuer '${this.issuerSlug}' does not exist.`, error);
			}
		);

		this.emailsLoaded = this.profileManager.userProfilePromise
			.then(profile => profile.emails.loadedPromise)
			.then(emails => {
				this.emails = emails.entities.filter(e => e.verified);
				this.emailsOptions = this.emails.map((e) => {
					return {
						label: e.email,
						value: e.email,
					};
				});
			});
	}

	get editControls(): issuerForm<FormControl> {
		return this.issuerForm.controls as any;
	}

	ngOnInit() {
		super.ngOnInit();
	}

	onSubmit(formState) {
		const issuer: ApiIssuerForEditing = {
			'name': formState.issuer_name,
			'description': formState.issuer_description,
			'email': formState.issuer_email,
			'url': formState.issuer_url,
		};

		if (formState.issuer_image && String(formState.issuer_image).length > 0) {
			issuer.image = formState.issuer_image;
		}

		this.editIssuerFinished = this.issuerManager.editIssuer(this.issuerSlug, issuer).then((new_issuer) => {
			this.router.navigate([ 'issuer/issuers', new_issuer.slug ]);
			this.messageService.setMessage("Issuer created successfully.", "success");
		}, error => {
			this.messageService.setMessage("Unable to create issuer: " + error, "error");
		}).then(() => this.editIssuerFinished = null);
	}

	clickSubmit(ev) {
		if (!this.issuerForm.valid) {
			ev.preventDefault();
			markControlsDirty(this.issuerForm);
		}
	}

	urlBlurred(ev) {
		const control: FormControl = this.issuerForm.controls[ 'issuer_url' ] as FormControl;
		UrlValidator.addMissingHttpToControl(control);
	}
}

interface issuerForm<T> {
	issuer_name: T;
	issuer_description: T;
	issuer_email: T;
	issuer_url: T;
	issuer_image: T;
}
