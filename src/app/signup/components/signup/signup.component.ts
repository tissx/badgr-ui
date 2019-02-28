import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SignupModel} from '../../models/signup-model.type';
import {SignupService} from '../../services/signup.service';
import {SessionService} from '../../../common/services/session.service';
import {BaseRoutableComponent} from '../../../common/pages/base-routable.component';
import {MessageService} from '../../../common/services/message.service';
import {EmailValidator} from '../../../common/validators/email.validator';
import {Title} from '@angular/platform-browser';
import {markControlsDirty} from '../../../common/util/form-util';
import {AppConfigService} from '../../../common/app-config.service';
import {OAuthManager} from '../../../common/services/oauth-manager.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
	selector: 'sign-up',
	templateUrl: './signup.component.html',
})
export class SignupComponent extends BaseRoutableComponent implements OnInit {
	signupForm: FormGroup;
	passwordGroup: FormGroup;

	signupFinished: Promise<unknown>;

	agreedTermsService = false;

	get theme() {
		return this.configService.theme;
	}

	constructor(
		fb: FormBuilder,
		private title: Title,
		public messageService: MessageService,
		private configService: AppConfigService,
		public sessionService: SessionService,
		public signupService: SignupService,
		public oAuthManager: OAuthManager,
		router: Router,
		route: ActivatedRoute
	) {
		super(router, route);
		title.setTitle(`Signup - ${this.configService.theme['serviceName'] || 'Badgr'}`);

		this.passwordGroup = fb.group({
				'password': ['', Validators.compose([Validators.required, passwordValidator])],
				'passwordConfirm': ['', Validators.required],
			}, {validator: passwordsMatchValidator}
		);
		this.signupForm = fb.group({
				'username': [
					'',
					Validators.compose([
						Validators.required,
						EmailValidator.validEmail
					])
				],
				'firstName': ['', Validators.required],
				'lastName': ['', Validators.required],
				'passwords': this.passwordGroup,
				'agreedTermsService': [false, Validators.requiredTrue],
				'marketingOptIn': [false],
			}
		);
	}

	ngOnInit() {
		if (this.sessionService.isLoggedIn) {
			this.router.navigate(['/userProfile']);
		}
	}

	onSubmit(formState) {
		const signupUser = new SignupModel(
			formState.username,
			formState.firstName,
			formState.lastName,
			formState.passwords.password,
			formState.agreedTermsService,
			formState.marketingOptIn
		);

		this.signupFinished = new Promise((resolve, reject) => {
			this.signupService.submitSignup(signupUser)
				.then(
					() => {
						this.sendSignupConfirmation(formState.username);
						resolve();
					},
					(response: HttpErrorResponse) => {
						const error = response.error;

						if (error) {
							if (error.password) {
								this.messageService.setMessage('Your password must be uncommon and at least 8 characters. Please try again.', 'error');
							} else {
								this.messageService.setMessage('' + error, 'error');
							}
						} else {
							this.messageService.setMessage('Unable to signup.', 'error');
						}
						resolve();
					}
				);
		}).then(() => this.signupFinished = null);
	}

	sendSignupConfirmation(email) {
		this.router.navigate(['signup/success', {email}]);
	}

	clickSubmit(ev) {
		let controlName: string;

		if (!this.signupForm.valid) {
			ev.preventDefault();
			markControlsDirty(this.signupForm);
			markControlsDirty(this.passwordGroup);
		}
	}

	get showMarketingOptIn() {
		return !!!this.theme['hideMarketingOptIn'];
	}
}

function passwordValidator(control: FormControl): { [errorName: string]: unknown } {
	if (control.value.length < 8) {
		return {'weakPassword': 'Password must be at least 8 characters'};
	}
}

function passwordsMatchValidator(group: FormGroup): { [errorName: string]: unknown } {
	if (group.controls['password'].value !== group.controls['passwordConfirm'].value) {
		return {passwordsMatch: 'Passwords do not match'};
	}
}
