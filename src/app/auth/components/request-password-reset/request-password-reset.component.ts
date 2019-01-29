import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { EmailValidator } from "../../../common/validators/email.validator";
import { SessionService } from "../../../common/services/session.service";
import { MessageService } from "../../../common/services/message.service";

import { markControlsDirty } from "../../../common/util/form-util";
import { BaseRoutableComponent } from "../../../common/pages/base-routable.component";

@Component({
	selector: "password-reset-request",
	template: `
		<main>
			<form-message></form-message>
			<header class="l-containerxaxis topbar">
				<!-- OAuth Banner -->
				<oauth-banner></oauth-banner>
				<!-- Title Message -->
				<h3 class="topbar-x-heading" id="heading-form">
					Forgot your password?
				</h3>
				<p class="topbar-x-subheading">
					Fill in your email, and we'll help you reset your password
				</p>
			</header>
			<div class="l-containerxaxis u-margin-yaxis3x u-width-formsmall">
				<!-- Login Form -->
				<form
					aria-labelledby="heading-form"
					role="form"
					[formGroup]="requestPasswordResetForm"
					(ngSubmit)="submitResetRequest()"
					novalidate
				>
					<fieldset aria-labelledby="heading-forgotpassword" role="group">
						<legend class="visuallyhidden" id="heading-forgotpassword">
							Forgot Password
						</legend>
						<bg-formfield-text
							[control]="requestPasswordResetForm.controls['username']"
							[label]="'Email'"
							[errorMessage]="'Please enter a valid email address'"
							[autofocus]="true"
							[initialValue]="prefilledEmail || ''"
						></bg-formfield-text>
					</fieldset>
					<div class="l-flex l-flex-1x l-flex-justifyend u-margin-top2x">
						<a
							class="button button-secondary"
							[routerLink]="['/auth/login']"
							[disabled-when-requesting]="true"
							>Cancel</a
						>
						<button
							class="button"
							type="submit"
							(click)="clickSubmit($event)"
							[loading-when-requesting]="true"
							loading-message="Resetting Password"
						>
							Reset Password
						</button>
					</div>
				</form>
			</div>
		</main>
	`
})
export class RequestPasswordResetComponent extends BaseRoutableComponent {
	readonly authLinkBadgrLogoSrc = require("../../../../breakdown/static/images/logo.svg");

	requestPasswordResetForm: FormGroup;

	get prefilledEmail() {
		return this.route.snapshot.params["email"];
	}

	constructor(
		private fb: FormBuilder,
		private sessionService: SessionService,
		private messageService: MessageService,
		route: ActivatedRoute,
		router: Router
	) {
		super(router, route);
	}

	ngOnInit() {
		super.ngOnInit();

		if (this.sessionService.isLoggedIn) {
			this.router.navigate(["/userProfile"]);
		}

		this.requestPasswordResetForm = this.fb.group(
			{
				username: [ "", [Validators.required, EmailValidator.validEmail] ]
			},
			{ updateOn: "blur" }
		);
	}

	submitResetRequest() {
		let email: string = this.requestPasswordResetForm.value.username;

		this.sessionService.submitResetPasswordRequest(email).then(
			response => this.router.navigate(["/auth/reset-password-sent"]),
			err => {
				if (err.status === 429) {
					this.messageService.reportAndThrowError(
						"Forgot password request limit exceeded." +
							" Please check your inbox for an existing message or wait to retry.",
						err
					);
				} else {
					this.messageService.reportAndThrowError(
						"Failed to send password reset request. Please contact support.",
						err
					);
				}
			}
		);
	}

	clickSubmit(ev) {
		let controlName: string;

		if (!this.requestPasswordResetForm.valid) {
			ev.preventDefault();
			markControlsDirty(this.requestPasswordResetForm);
		}
	}
}
