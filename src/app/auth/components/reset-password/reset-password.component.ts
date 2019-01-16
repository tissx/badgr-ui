import { Component } from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SessionService } from "../../../common/services/session.service";
import { MessageService } from "../../../common/services/message.service";
import { Title } from "@angular/platform-browser";
import { markControlsDirty } from "../../../common/util/form-util";
import { BaseRoutableComponent } from "../../../common/pages/base-routable.component";
import { AppConfigService } from "../../../common/app-config.service";

@Component({
	selector: 'change-password',
	templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent extends BaseRoutableComponent {
	changePasswordForm: FormGroup;

	get resetToken(): string {
		return this.route.snapshot.params['token'];
	}

	constructor(
		private fb: FormBuilder,
		private title: Title,
		private sessionService: SessionService,
		route: ActivatedRoute,
		router: Router,
		private configService: AppConfigService,
		private _messageService: MessageService
	) {
		super(router, route);

		title.setTitle(`Reset Password - ${this.configService.theme['serviceName'] || "Badgr"}`);

		if (! this.resetToken) {
			this._messageService.reportHandledError("No reset token provided. Please try the reset link again.");
		}
	}

	ngOnInit() {
		super.ngOnInit();

		this.changePasswordForm = this.fb.group({
				password1: [ '', Validators.required ],
				password2: [ '', Validators.required ]
			}, { validator: this.passwordsMatch }
		);
	}

	submitChange() {
		const TOKEN: string = this.resetToken;
		const NEW_PASSWORD: string = this.changePasswordForm.controls[ 'password1' ].value;

		if (TOKEN) {
			this.sessionService.submitForgotPasswordChange(NEW_PASSWORD, TOKEN)
				.then(
					() => {
						// TODO: We should get the user's name and auth so we can send them to the auth page pre-populated
						this._messageService.reportMajorSuccess('Your password has been changed successfully.', true);
						return this.router.navigate([ "/auth" ]);
					},
					err => this._messageService.reportAndThrowError('Your password must be uncommon and at least 8 characters. Please try again.', err)
				);
		}
	}

	clickSubmit(ev: Event) {
		if (!this.changePasswordForm.valid) {
			ev.preventDefault();
			markControlsDirty(this.changePasswordForm);
		}
	}

	passwordsMatch(group: FormGroup) {
		let valid = true;
		let val: string;

		for (let name in group.controls) {
			if (val === undefined) {
				val = group.controls[ name ].value
			} else {
				if (val !== group.controls[ name ].value) {
					valid = false;
					break;
				}
			}
		}

		if (valid) {
			return null;
		}

		return { passwordsMatch: "Passwords do not match" };
	}
}


