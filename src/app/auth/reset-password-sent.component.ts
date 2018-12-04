import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../common/services/session.service";
import {AppConfigService} from "../common/app-config.service";
import {BaseRoutableComponent} from "../common/pages/base-routable.component";

@Component({
	selector: 'password-reset-sent',
	template: `
		<main>
			<form-message></form-message>

			<div class="l-auth">
				<!-- OAuth Banner -->
				<oauth-banner></oauth-banner>
	
				<!-- Title Message -->
				<h3 class="l-auth-x-title title title-bold" id="heading-form">Password Reset</h3>
				<p class="l-auth-x-text text text-quiet">
					Check your inbox for an email to confirm this request and choose a new password.
				</p>
			</div>
		</main>
	`,
})
export class ResetPasswordSent extends BaseRoutableComponent {
	constructor(
		private sessionService: SessionService,
		router: Router,
		route: ActivatedRoute,
		private configService: AppConfigService
	) {
		super(router, route);
	}

	ngOnInit() {
		super.ngOnInit();

		if (this.sessionService.isLoggedIn) {
			this.router.navigate([ '/auth/userProfile' ]);
		}
	}

	get helpEmailAddress() {
		return this.configService.helpConfig.email;
	}
}
