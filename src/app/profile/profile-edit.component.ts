import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "../common/services/message.service";
import {SessionService} from "../common/services/session.service";
import {Title} from "@angular/platform-browser";
import {markControlsDirty} from "../common/util/form-util";

import {CommonDialogsService} from "../common/services/common-dialogs.service";
import {BaseAuthenticatedRoutableComponent} from "../common/pages/base-authenticated-routable.component";
import {UserProfileManager} from "../common/services/user-profile-manager.service";
import {UserProfile} from "../common/model/user-profile.model";
import {AppConfigService} from "../common/app-config.service";

@Component({
	templateUrl: './profile-edit.component.html',
})
export class ProfileEditComponent extends BaseAuthenticatedRoutableComponent implements OnInit {
	profile: UserProfile;

	profileLoaded: Promise<any>;

	constructor(
		router: Router,
		route: ActivatedRoute,
		sessionService: SessionService,
		protected formBuilder: FormBuilder,
		protected title: Title,
		protected messageService: MessageService,
		protected profileManager: UserProfileManager,
		protected configService: AppConfigService,
		protected dialogService: CommonDialogsService
) {
		super(router, route, sessionService);
		title.setTitle(`Profile - Edit - ${this.configService.theme['serviceName'] || "Badgr"}`);

		this.profileLoaded = profileManager.userProfilePromise.then(
			profile => this.profile = profile,
			error => this.messageService.reportAndThrowError(
				"Failed to load userProfile", error
			)
		);

		this.profileEditForm = this.formBuilder.group({
			firstName: [ '', Validators.required ],
			lastName: [ '', Validators.required ],
		} as ProfileEditFormControls<any[]>);

		this.profileLoaded.then(() => this.startEditing());
	}
	profileEditForm: FormGroup;

	get editControls(): ProfileEditFormControls<FormControl> {
		return this.profileEditForm.controls as any;
	}

	startEditing() {
		this.editControls.firstName.setValue(this.profile.firstName, { emitEvent: false });
		this.editControls.lastName.setValue(this.profile.lastName, { emitEvent: false });
	}

	submitEdit(formState: ProfileEditFormControls<string>) {
		this.profile.firstName = formState.firstName;
		this.profile.lastName = formState.lastName;

		this.profile.save().then(
			success => {
				this.messageService.reportMinorSuccess(`Saved profile changes`);
				this.router.navigate(['/profile/profile']);
			},
			error => {
				this.messageService.reportHandledError(`Failed save profile changes`, error);
			}
		);
	}

	validateEditForm(ev) {
		if (! this.profileEditForm.valid) {
			ev.preventDefault();
			markControlsDirty(this.profileEditForm);
		}
	}
}


interface ProfileEditFormControls<T> {
	firstName: T;
	lastName: T;
}
