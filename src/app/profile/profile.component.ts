import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

import {EmailValidator} from "../common/validators/email.validator";
import {MessageService} from "../common/services/message.service";
import {SessionService} from "../common/services/session.service";
import {Title} from "@angular/platform-browser";
import {markControlsDirty} from "../common/util/form-util";

import {CommonDialogsService} from "../common/services/common-dialogs.service";
import {BaseAuthenticatedRoutableComponent} from "../common/pages/base-authenticated-routable.component";
import {BadgrApiFailure} from "../common/services/api-failure";
import {SocialAccountProviderInfo,} from "../common/model/user-profile-api.model";
import {UserProfileManager} from "../common/services/user-profile-manager.service";
import {UserProfile, UserProfileEmail, UserProfileSocialAccount} from "../common/model/user-profile.model";
import {Subscription} from "rxjs";
import {QueryParametersService} from "../common/services/query-parameters.service";
import {OAuthApiService} from "../common/services/oauth-api.service";
import {AppConfigService} from "../common/app-config.service";

@Component({
	selector: 'userProfile',
	template: `
		<main *bgAwaitPromises="[profileLoaded, emailsLoaded]">
			<form-message></form-message>

			<div class="topbar">
				<div class="l-containerxaxis">
					<div class="topbar-x-wrap">
						<div class="topbar-x-heading l-spacestack">
							{{ profile?.firstName }} {{ profile?.lastName}}
							<div class="l-primarymore">
								<button [routerLink]="['../change-password']" class="button">Change Password</button>
								<button [bgPopupMenuTrigger]="editMenu" class="buttonicon buttonicon-secondary" id="trigger2">
									<svg icon="icon_more"></svg>
									<span class="visuallyhidden">More</span>
								</button>
							</div>
						</div>
					</div>
				</div>
				<bg-popup-menu #editMenu class="menu" id="menu2">
					<div [routerLink]="['/profile/edit']" class="menuitem">
						<svg icon="icon_edit"></svg> Edit
					</div>
				</bg-popup-menu>
			</div>

			<div class="l-containerxaxis">
				<div class="l-stack l-stack-2x u-margin-yaxis3x">
					<p class="u-text-h3-bold">
						Emails
					</p>
					<form class="table-x-tr table-x-active"
						[formGroup]="emailForm"
						(ngSubmit)="onSubmit(emailForm.value)">
					<div class="forminput forminput-withbutton forminput-light1 u-width-formsmall">

						<!--<bg-formfield-text [control]="emailForm.controls['email']"
															 [errorMessage]="'Please enter a valid email address'"
															 fieldType="email"
															 placeholder="Member Email">
						</bg-formfield-text>-->

						<label class="forminput-x-label visuallyhidden" for="forminput">Search</label>
						<div class="forminput-x-inputs">
							<input type="text" name="forminput" id="forminput" placeholder="Email Address...">
							
							<div class="forminput-x-button">
								<button class="button button-secondary button-informinput">
									Add
								</button>
							</div>
						</div>
					</div>
					</form>
				</div>

				<table class="datatable datatable-roundheaders datatable-tallrows">
					<thead class="datatable-x-head">
					<tr class="datatable-x-header">
						<th class="datatable-x-cell" style="width:80%;">Email Address</th>
						<th class="datatable-x-cell">Status</th>
						<th class="datatable-x-cell"> <span class="visuallyhidden">Actions</span></th>
					</tr>
					</thead>
					<tbody class="datatable-x-body">
					
					<tr class="datatable-x-row" *ngFor="let email of emails">
						<td class="datatable-x-cell">
							<div class="l-stack l-stack-start">
								<p class="u-text-body u-break-word">
									{{email.email}}
								</p>
								<div *ngIf="email.primary" class="badgestatus badgestatus-new badgestatus-intable">primary</div>
							</div>
						</td>
						<td class="datatable-x-cell u-text-body">
							<div class="l-flex l-flex-aligncenter l-flex-1x">
								<div *ngIf="email.verified" class="l-flex l-flex-aligncenter l-flex-1x">
									<svg icon="icon_checkmark_circle" class="icon icon-success" viewBox="0 0 24 24"></svg>
									<p class="u-text-body u-hidden-maxtablet">
										Verified
									</p>
								</div>
								<div *ngIf="!email.verified" class="l-flex l-flex-aligncenter l-flex-1x">
									<svg icon="icon_pending" class="icon icon-dark4" viewBox="0 0 24 24"></svg>
									<p class="u-text-body u-hidden-maxtablet">
										Pending
									</p>
								</div>
							</div>
						</td>
						<td class="datatable-x-cell">
							
							<button 
								*ngIf="!email.verified || (email.verified && !email.primary) || (emails.length > 1 && ! email.primary)"
								[bgPopupMenuTrigger]="emailMenu" 
								class="buttonicon buttonicon-secondary buttonicon-nopadding" >
								<svg icon="icon_more"></svg>
								<span class="visuallyhidden">More</span>
							</button>
							
							<bg-popup-menu #emailMenu class="menu" id="menu1">

								<div *ngIf="!email.verified"
										 class="menuitem button button-primaryghost"
										 (click)="clickResendVerification($event, email)"
										 [disabled-when-requesting]="true"
								>
									<svg icon="icon_refresh"></svg> Resend Verification
								</div>

								<div *ngIf="email.verified && !email.primary"
										 class="menuitem button button-primaryghost"
										 (click)="clickMakePrimary($event, email)"
										 [disabled-when-requesting]="true"
								>
									<svg icon="icon_refresh"></svg> Make primary
								</div>

								<div class="menuitem"
										 [class.button-is-disabled]="email.primary"
										 (click)="clickConfirmRemove($event, email)"
										 *ngIf="emails.length > 1 && ! email.primary"
								>
									<svg icon="icon_remove"></svg> Remove
								</div>

							</bg-popup-menu>
							
						</td>
					</tr>
					
					</tbody>
				</table>
				<h2 class="u-text-h3-bold u-margin-yaxis3x">Linked Accounts</h2>

				<table class="datatable datatable-roundheaders">
					<thead class="datatable-x-head" *ngIf="socialAccounts.length > 0">
					<tr class="datatable-x-header">
						<th class="datatable-x-cell">Service</th>
						<th class="datatable-x-cell">Account</th>
						<th class="datatable-x-cell"> <span class="visuallyhidden">Actions</span></th>
					</tr>
					</thead>
					<tbody class="datatable-x-body">
					<tr *ngFor="let account of socialAccounts" class="datatable-x-row">
						<td class="datatable-x-cell u-text-small">
							{{ account.providerInfo.name }}
						</td>
						<td class="datatable-x-cell u-text-small u-break-all">
							{{ account.fullLabel }}
						</td>
						<td class="datatable-x-cell">
							<div class="l-flex l-flex-justifyend">
								<a 
									href="" 
									class="u-text u-text-small u-text-bold"
									(click)="unlinkAccount(account)">Unlink</a>
							</div>
						</td>
					</tr>
					</tbody>
				</table>

				<p class="u-text-body u-margin-yaxis3x u-width-paragraph">
					Click one of the provider buttons below to allow you to log in to {{configService.theme['serviceName'] || "Badgr"}} in the future using that service rather than your email and password.
				</p>
				<p class="u-text-small u-text-bold u-margin-bottom1x">Link Account:</p>

				<div class="rule u-margin-bottom2x"></div>

				<div class="l-grid l-grid-medium">
					
					<button *ngFor="let provider of sessionService.enabledExternalAuthProviders"
									class="socialbutton socialbutton-{{ provider.slug }}"
									style="min-width: initial;"
									type="button"
									(click)="linkAccount(provider)"
					>{{ provider.name }}
					</button>
					
				</div>

			</div>

			
			<!-- !!!!!!!!!!!!!!!!!!! -->
			
			
			<!--<div class="l-containerhorizontal l-containervertical l-childrenvertical wrap">

				<div class="l-childrenvertical l-headeredsection">
					&lt;!&ndash; Email Table &ndash;&gt;
					<header>
						<h2 class="title title-is-smallmobile">Emails</h2>
					</header>
					<div class="table">
						&lt;!&ndash; table header &ndash;&gt;
						<div class="table-x-thead">
							<div class="table-x-tr">
								<div class="table-x-th">Email Address</div>
								<div class="table-x-th">Status</div>
								<div class="table-x-th hidden hidden-is-desktop"><span class="visuallyhidden">Actions</span></div>
								&lt;!&ndash; Additional header for menu more column&ndash;&gt;
								<div class="table-x-th hidden hidden-is-lessThen-desktop" scope="row">&nbsp;</div>
							</div>
						</div>
						&lt;!&ndash; End table header &ndash;&gt;

						&lt;!&ndash; table body &ndash;&gt;
						<div class="table-x-tbody hidden hidden-is-tablet">
							<form class="table-x-tr table-x-active"
							      [formGroup]="emailForm"
							      (ngSubmit)="onSubmit(emailForm.value)">

								<div class="table-x-th " scope="row">
									<div class="formfield l-childrenhorizontal">
										<bg-formfield-text [control]="emailForm.controls['email']"
														   [errorMessage]="'Please enter a valid email address'"
														   fieldType="email"
										                   placeholder="Member Email">
										</bg-formfield-text>
									</div>
								</div>

								<div class="table-x-td hidden hidden-is-desktop">&nbsp;</div>
								&lt;!&ndash; Additional header for menu more column&ndash;&gt;
								<div class="table-x-th hidden hidden-is-lessThen-desktop" scope="row">&nbsp;</div>

								<div class="table-x-td">
									<div class="l-childrenhorizontal l-childrenhorizontal-small l-childrenhorizontal-right">
										<button type="submit"
										        class="button"
										        (click)="clickAddEmail($event)"
										        [disabled-when-requesting]="true">
											Add Email
										</button>
									</div>
								</div>
							</form>
						</div>
						&lt;!&ndash; end FORM &ndash;&gt;

						&lt;!&ndash; table body &ndash;&gt;
						<div class="table-x-tbody">
							<div class="table-x-tr" *ngFor="let email of emails">
								<div class="table-x-th" scope="row" [ngSwitch]="email.verified">
									<div class="l-childrenhorizontal">
										<span>{{ email.email }}</span> <span class="state state-pill state-is-pending"
										                                     *ngIf="email.primary">Primary</span>
									</div>
								</div>
								<div class="table-x-td">
									<div class="l-childrenhorizontal">
										<span *ngIf="email.verified">Verified</span>
										<span *ngIf="!email.verified">Pending</span>
									</div>
								</div>

								<div class="table-x-td table-x-actions hidden hidden-is-desktop">
									<div class="l-childrenhorizontal l-childrenhorizontal-right l-childrenhorizontal-stackmobile">
										<button class="button button-primaryghost"
										        [class.button-is-disabled]="email.primary"
										        (click)="clickConfirmRemove($event, email)"
										        [disabled-when-requesting]="true"
										        *ngIf="emails.length > 1 && ! email.primary"
										>
											Remove
										</button>
										<button *ngIf="email.verified && !email.primary"
										        class="button button-primaryghost"
										        (click)="clickMakePrimary($event, email)"
										        [disabled-when-requesting]="true"
										>
											Make primary
										</button>
										<button *ngIf="!email.verified"
										        class="button button-primaryghost"
										        (click)="clickResendVerification($event, email)"
										        [disabled-when-requesting]="true"
										>
											Re-send Verification
										</button>
									</div>
								</div>

								&lt;!&ndash; &ndash;&gt;
								<div class="table-x-td  pathwaydetail-x-menu menumore hidden hidden-is-lessThen-desktop"
								     [class.menumore-is-active]="menu.show"
								     [class.pathwaydetail-x-inactive]="isMoveInProgress"
								     #menu
								     (document:click)="(menu.clickedState ? (menu.clickedState = false) : (menu.show = false)) || true">

									&lt;!&ndash; TODO: Above is an awesome hack that hides the menu when clicking on the document... might want to replace with something more stable. &ndash;&gt;
									<button type="button"
									        aria-controls="menumore1"
									        (click)="menu.show = ! menu.show;
								            menu.clickedState = menu.show;"
									>Toggle Menu
									</button>

									<ul [attr.aria-hidden]="! menu.show"
									    (click)="menu.show = false"
									>
										<li class="menumoreitem"
										    *ngIf="! isMoveInProgress"
										>
											<button aria-controls="menumore1"
											        class="button button-primaryghost"
											        [class.button-is-disabled]="email.primary"
											        (click)="clickConfirmRemove($event, email)"
											        [disabled-when-requesting]="true"
											>Remove
											</button>
										</li>
										<li class="menumoreitem">
											<button *ngIf="email.verified && !email.primary"
											        class="button button-primaryghost"
											        (click)="clickMakePrimary($event, email)"
											>Make primary
											</button>
										</li>
										<li class="menumoreitem">
											<button *ngIf="!email.verified"
											        class="button button-primaryghost"
											        (click)="clickResendVerification($event, email)"
											        [disabled-when-requesting]="true"
											>Re-send Verification
											</button>
										</li>
									</ul>
								</div>
								&lt;!&ndash; &ndash;&gt;
							</div>
						</div>
						&lt;!&ndash; table body &ndash;&gt;
					</div>

					&lt;!&ndash; Social Account Table &ndash;&gt;
					<header>
						<h2 class="title title-is-smallmobile">Linked Accounts</h2>
					</header>
					<p *ngIf="socialAccounts.length == 0">
						Click one of the provider buttons below to allow you to log in to {{configService.theme['serviceName'] || "Badgr"}} in the future using that service
						rather than your email and password.
					</p>
					<table class="table">
						<thead *ngIf="socialAccounts.length > 0">
							<tr>
								<th>Service</th>
								<th>Account</th>
								<th><span class="visuallyhidden">Actions</span></th>
							</tr>
						</thead>

						<tbody>
							<tr *ngFor="let account of socialAccounts">
								<td class="l-childrenhorizontal">
									{{ account.providerInfo.name }}
								</td>
								<td class="l-childrenhorizontal" style="overflow: hidden; text-overflow: ellipsis; max-width: 200px;">
									{{ account.fullLabel }}
								</td>
								<td>
									<div class="l-childrenhorizontal l-childrenhorizontal-right l-childrenhorizontal-stackmobile">
										<button class="button button-primaryghost"
										        (click)="unlinkAccount(account)"
										        [disabled-when-requesting]="true"
										>Unlink
										</button>
									</div>
								</td>
							</tr>
						</tbody>

						<tbody class="hidden hidden-is-tablet" *ngIf="sessionService.enabledExternalAuthProviders.length > 0">
							<td class="table-x-td" colspan="3">
								<section class="formfield">
									<label>Link an Account</label>

									<div class="formfield-x-buttongrid">
										<button *ngFor="let provider of sessionService.enabledExternalAuthProviders"
										        class="buttonauth buttonauth-{{ provider.slug }}"
														style="min-width: initial;"
										        type="button"
										        (click)="linkAccount(provider)"
										>{{ provider.name }}
										</button>
									</div>
								</section>
							</td>
						</tbody>
					</table>
				</div>
			</div>-->
		</main>
	`
})
export class ProfileComponent extends BaseAuthenticatedRoutableComponent implements OnInit, OnDestroy {
	emailForm: FormGroup;
	profile: UserProfile;
	emails: UserProfileEmail[];

	profileLoaded: Promise<any>;
	emailsLoaded: Promise<any>;

	newlyAddedSocialAccountId: string;

	isMoveInProgress = false;
	menuOpen = false;

	private emailsSubscription: Subscription;

	constructor(
		router: Router,
		route: ActivatedRoute,
		sessionService: SessionService,
		protected formBuilder: FormBuilder,
		protected title: Title,
		protected messageService: MessageService,
		protected profileManager: UserProfileManager,
		protected dialogService: CommonDialogsService,
		protected paramService: QueryParametersService,
		protected configService: AppConfigService,
		private oauthService: OAuthApiService
) {
		super(router, route, sessionService);
		title.setTitle(`Profile - ${this.configService.theme['serviceName'] || "Badgr"}`);

		this.emailForm = this.formBuilder.group({
			'email': [
				'',
				Validators.compose([
					Validators.required,
					EmailValidator.validEmail
				])
			]
		});

		this.profileLoaded = this.profileManager.userProfilePromise.then(
			profile => {
				this.profile = profile;

				this.emailsSubscription = profile.emails.loaded$.subscribe(update => {
					const emails = profile.emails.entities;

					this.emails = emails.filter((e) => e.primary).concat(
						emails.filter((e) => e.verified && !e.primary).concat(
							emails.filter((e) => !e.verified)
						)
					);
				});
			},
			error => this.messageService.reportAndThrowError(
				"Failed to load userProfile", error
			)
		);

		this.emailsLoaded = this.profileManager.userProfilePromise
			.then(p => p.emails.loadedPromise);

		// Handle newly added social account
		this.newlyAddedSocialAccountId = paramService.queryStringValue("addedSocialAccountId", true);
	}

	get socialAccounts() {
		return this.profile && this.profile.socialAccounts.entities;
	}

	ngOnInit() {
		super.ngOnInit();

		// Handle auth errors (e.g. when linking a new social account)
		if (this.paramService.queryStringValue("authError", true)) {
			this.messageService.reportHandledError(this.paramService.queryStringValue("authError", true), null, true);
		}
		this.paramService.clearInitialQueryParams();
	}

	ngOnDestroy(): void {
		this.emailsSubscription.unsubscribe();
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Linked Accounts

	async unlinkAccount(socialAccount: UserProfileSocialAccount) {
		if (await this.dialogService.confirmDialog.openTrueFalseDialog({
			dialogTitle: `Unlink ${socialAccount.providerInfo.name}?`,
			dialogBody: `Are you sure you want to unlink the ${socialAccount.providerInfo.name} account ${socialAccount.fullLabel}) from your ${this.configService.theme['serviceName'] || "Badgr"} account? You may re-link in the future by clicking the ${socialAccount.providerInfo.name} button on this page.`,
			resolveButtonLabel: `Unlink ${socialAccount.providerInfo.name} account?`,
			rejectButtonLabel: "Cancel"
		})) {
			socialAccount.remove().then(
				() => this.messageService.reportMinorSuccess(`Removed ${socialAccount.fullLabel} from your account`),
				error => {
					if (error.response.status == 403){
						this.messageService.reportHandledError(`Failed to remove ${socialAccount.fullLabel} from your account: ${error.response._body}`);
					}
					else {
						this.messageService.reportHandledError(`Failed to remove ${socialAccount.fullLabel} from your account: ${BadgrApiFailure.from(error).firstMessage}`);
					}
				}
			);
		}
	}

	linkAccount(info: SocialAccountProviderInfo) {
		this.oauthService.connectProvider(info).then(r => {
			window.location.href = r.url;
		})
	}


	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Emails

	onSubmit(formState) {
		this.profile.addEmail(formState.email).then(
			email => {
				this.messageService.setMessage("New email is currently pending.", "success");
				const emailControl: FormControl = <FormControl>this.emailForm.controls[ 'email' ];

				emailControl.setValue('', { emitEvent: false });
				emailControl.setErrors(null, { emitEvent: false });
			},
			error => {
				if (error.response.status == 400) {
					this.messageService.reportHandledError(`Unable to add email: Email already exists`);
				}
				else {
					this.messageService.reportHandledError(`Unable to add email: ${BadgrApiFailure.from(error).firstMessage}`);
				}
			}
		);
	}

	clickAddEmail(ev: MouseEvent) {
		console.log("clicked!")
		if (!this.emailForm.valid) {
			ev.preventDefault();
			markControlsDirty(this.emailForm);
		}
	}

	//initialed displayed remove button.
	clickConfirmRemove(ev: MouseEvent, email: UserProfileEmail) {
		if (email.primary) {
			ev.preventDefault();
		} else {
			this.dialogService.confirmDialog.openResolveRejectDialog({
				dialogTitle: "Delete Email",
				dialogBody: `All badges associated with this email address will be removed. Are you sure you want to delete email ${email.email}`,
				resolveButtonLabel: "Confirm remove",
				rejectButtonLabel: "Cancel"
			}).then(
				() => this.clickRemove(ev, email), //success - clicked confirm
				cancel => void 0 //fail - clicked cancel
			);
		}
	}

	clickRemove(ev: MouseEvent, email: UserProfileEmail) {
		email.remove().then(
			() => this.messageService.reportMinorSuccess(`You have successfully removed ${email.email}`),
			error => this.messageService.reportHandledError(`Unable to remove ${email.email}: ${BadgrApiFailure.from(error).firstMessage}`, error)
		);
	}

	clickMakePrimary(ev: MouseEvent, email: UserProfileEmail) {
		email.makePrimary().then(
			() => {
				this.messageService.reportMajorSuccess(`${email.email} is now your primary email.`);
				this.profile.emails.updateList();
			},
			error => this.messageService.reportAndThrowError(`Unable to set ${email.email} to primary email: ${BadgrApiFailure.from(error).firstMessage}`, error)
		);
	}

	clickResendVerification(ev: MouseEvent, email: UserProfileEmail) {
		email.resendVerificationEmail().then(
			() => this.messageService.reportMajorSuccess(`Confirmation re-sent to ${email.email}`),
			error => {
				if (error.response.status == 429){
					this.messageService.reportAndThrowError(`Failed to resend confirmation to ${email.email}: ${error.response._body}`, error);
				}
				else {
					this.messageService.reportAndThrowError(`Failed to resend confirmation to ${email.email}: ${BadgrApiFailure.from(error).firstMessage}`, error);
				}
			}
		);
	}
}
