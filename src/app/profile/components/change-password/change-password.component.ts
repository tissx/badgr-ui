import {Component} from '@angular/core';

import {FormBuilder, FormControl, ValidationErrors, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionService} from '../../../common/services/session.service';
import {MessageService} from '../../../common/services/message.service';
import {Title} from '@angular/platform-browser';
import {BaseRoutableComponent} from '../../../common/pages/base-routable.component';
import {UserProfileManager} from '../../../common/services/user-profile-manager.service';
import {UserProfile} from '../../../common/model/user-profile.model';
import {AppConfigService} from '../../../common/app-config.service';
import {typedGroup} from '../../../common/util/typed-forms';


@Component({
	selector: 'change-password',
	templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent extends BaseRoutableComponent {
	changePasswordForm = typedGroup()
		.addControl("password1", "", [ Validators.required, Validators.minLength(8) ])
		.addControl("password2", "", [ Validators.required, this.passwordsMatch.bind(this) ])
		.addControl("current_password", "", [ Validators.required ]);

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
	}

	submitChange() {
		if (! this.changePasswordForm.markTreeDirtyAndValidate()) {
			return;
		}

		this.profile.updatePassword(
			this.changePasswordForm.value.password1,
			this.changePasswordForm.value.current_password
		)
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

	passwordsMatch(): ValidationErrors | null {
		if (! this.changePasswordForm) return null;

		const p1 = this.changePasswordForm.controls.password1.value;
		const p2 = this.changePasswordForm.controls.password2.value;

		if (p1 && p2 && p1 !== p2) {
			return { passwordsMatch: "Passwords do not match" };
		}

		return null;
	}

	cancel() {
		this.router.navigate(["/profile/profile"]);
	}
}


