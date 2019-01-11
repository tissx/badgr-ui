import {Component} from "@angular/core";

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../common/services/session.service";
import {MessageService} from "../common/services/message.service";
import {Title} from "@angular/platform-browser";
import {markControlsDirty} from "../common/util/form-util";
import {BaseRoutableComponent} from "../common/pages/base-routable.component";
import {UserProfileManager} from "../common/services/user-profile-manager.service";
import {UserProfile} from "../common/model/user-profile.model";
import {AppConfigService} from "../common/app-config.service";


@Component({
	selector: 'change-password',
	template: `
		<main>
			<form-message></form-message>
			<header class="l-containerxaxis topbar">
				<h3 class="topbar-x-heading">Change Password</h3>
				<p class="topbar-x-subheading">Enter a new password.</p>
			</header>
			<div class="l-containerxaxis u-margin-top3x u-width-formsmall">
				<form class="l-form" [formGroup]='changePasswordForm' (ngSubmit)="submitChange()" novalidate>
					<fieldset>
						<bg-formfield-text [control]="changePasswordForm.controls.current_password"
						                   [label]="'Current Password'"
						                   [errorMessage]="'Please enter current password'"
						                   fieldType="password"
						                   [autofocus]="true">              
						</bg-formfield-text>
						<div class="u-margin-top2x">
							<bg-formfield-text [control]="changePasswordForm.controls.password1"
							                   [label]="'New Password'"
							                   [errorMessage]="'Please enter a new password'"
							                   fieldType="password"
							                   [sublabel]="'Must be at least 8 characters'"
							                   >
							</bg-formfield-text>
						</div>
						<div class="u-margin-top2x">
							<bg-formfield-text [control]="changePasswordForm.controls.password2"
							                   [label]="'Confirm New Password'"
							                   fieldType="password"
							                   [errorMessage]="{ required: 'Please confim your new password' }"
							                   >
							</bg-formfield-text>
						</div>
					</fieldset>
					<div class="l-flex l-flex-1x l-flex-justifyend u-margin-top2x">
						<a class="button button-secondary"
						   (click)="cancel()"
						   [disabled-when-requesting]="true"
						   tabindex="0"
						>Cancel</a>
		
						<button class="button"
						        type="submit"
						        (click)="clickSubmit($event)"
						        [loading-when-requesting]="true"
						        loading-message="Changing Password"
						>Change Password</button>
					</div>
					<p class="u-text u-margin-yaxis3x">
						Don’t have your current password?
			            <br>
			            <a (click)="forgotPassword()" class="u-text-link">Click here</a>
			            to reset by email.
					</p>
				</form>
			</div>
		</main>

	`
})
export class ChangePasswordComponent extends BaseRoutableComponent {
	changePasswordForm: FormGroup;
	profile: UserProfile;

	constructor(
		private fb: FormBuilder,
		private title: Title,
		private sessionService: SessionService,
		private profileManager: UserProfileManager,
		route: ActivatedRoute,
		router: Router,
		protected configService: AppConfigService,
		private _messageService: MessageService
	) {
		super(router, route);

		title.setTitle(`Change Password - ${this.configService.theme['serviceName'] || "Badgr"}`);

		this.profileManager.userProfilePromise
			.then(profile => this.profile = profile);

		this.changePasswordForm = this.fb.group({
				password1: [ '', Validators.required ],
				password2: [ '', Validators.required ],
				current_password: [ '', Validators.required ]
			}, { validator: this.passwordsMatch }
		);
	}

	submitChange() {
		const new_password: string = this.changePasswordForm.controls[ 'password1' ].value;
		const current_password: string = this.changePasswordForm.controls[ 'current_password' ].value;

		this.profile.updatePassword(new_password, current_password)
			.then(
				() => {
					this._messageService.reportMajorSuccess('Your password has been changed successfully.', true);
					this.router.navigate([ "/profile/profile" ]);
				},
				err => this._messageService.reportAndThrowError('Your password must be uncommon and at least 8 characters. Please try again.', err)
			);
	}

	forgotPassword() {
		this.sessionService.logout();
		this.router.navigate(['/auth/request-password-reset']);
	}

	clickSubmit(ev: Event) {
		if (!this.changePasswordForm.valid) {
			ev.preventDefault();
			markControlsDirty(this.changePasswordForm);
		}
	}

	passwordsMatch(group: FormGroup) {
		const p1 = group.controls.password1.value;
		const p2 = group.controls.password1.value;

		if (p1 && p2 && p1 !== p2) {
			return { passwordsMatch: "Passwords do not match" };
		}

		return null;
	}

	cancel() {
		this.router.navigate(["/profile/profile"]);
	}
}


