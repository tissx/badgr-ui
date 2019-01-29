import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../../common/services/session.service';
import { BaseAuthenticatedRoutableComponent } from '../../../common/pages/base-authenticated-routable.component';
import { MessageService } from '../../../common/services/message.service';
import { IssuerManager } from '../../services/issuer-manager.service';
import { BadgeClassManager } from '../../services/badgeclass-manager.service';
import { Issuer } from '../../models/issuer.model';
import { BadgeClass } from '../../models/badgeclass.model';
import { Title } from '@angular/platform-browser';
import { LearningPathway } from '../../models/pathway.model';
import { PathwayManager } from '../../services/pathway-manager.service';
import { RecipientGroup } from '../../models/recipientgroup.model';
import { RecipientGroupManager } from '../../services/recipientgroup-manager.service';
import { preloadImageURL } from '../../../common/util/file-util';
import { UserProfileManager } from '../../../common/services/user-profile-manager.service';
import { UserProfileEmail } from '../../../common/model/user-profile.model';

import { ApiExternalToolLaunchpoint } from 'app/externaltools/models/externaltools-api.model';
import { ExternalToolsManager } from 'app/externaltools/services/externaltools-manager.service';
import { AppConfigService } from '../../../common/app-config.service';

@Component({
	selector: 'issuer-detail',
	templateUrl: './issuer-detail.component.html'
})
export class IssuerDetailComponent extends BaseAuthenticatedRoutableComponent implements OnInit {
	readonly issuerImagePlaceHolderUrl = preloadImageURL(
		require('../../../../breakdown/static/images/placeholderavatar-issuer.svg')
	);

	issuer: Issuer;
	issuerSlug: string;
	badges: Array<BadgeClass>;
	confirmingRecipientGroup: RecipientGroup;
	launchpoints: ApiExternalToolLaunchpoint[];

	pathways: LearningPathway[] = [];
	recipientGroups: RecipientGroup[] = [];
	profileEmails: UserProfileEmail[] = [];

	issuerLoaded: Promise<any>;
	groupsLoaded: Promise<any>;
	pathwaysLoaded: Promise<any>;
	badgesLoaded: Promise<any>;

	profileEmailsLoaded: Promise<any>;

	constructor(
		loginService: SessionService,
		router: Router,
		route: ActivatedRoute,
		protected messageService: MessageService,
		protected title: Title,
		protected issuerManager: IssuerManager,
		protected pathwayManager: PathwayManager,
		protected badgeClassService: BadgeClassManager,
		protected recipientGroupManager: RecipientGroupManager,
		protected profileManager: UserProfileManager,
		private configService: AppConfigService,
		private externalToolsManager: ExternalToolsManager
	) {
		super(router, route, loginService);

		title.setTitle(`Issuer Detail - ${this.configService.theme['serviceName'] || 'Badgr'}`);

		this.issuerSlug = this.route.snapshot.params['issuerSlug'];

		this.externalToolsManager.getToolLaunchpoints('issuer_external_launch').then((launchpoints) => {
			this.launchpoints = launchpoints.filter((lp) => Boolean(lp));
		});

		this.issuerLoaded = this.issuerManager.issuerBySlug(this.issuerSlug).then(
			(issuer) => {
				this.issuer = issuer;
				this.title.setTitle(
					`Issuer - ${this.issuer.name} - ${this.configService.theme['serviceName'] || 'Badgr'}`
				);

				this.badgesLoaded = new Promise((resolve, reject) => {
					this.badgeClassService.badgesByIssuerUrl$.subscribe(
						(badgesByIssuer) => {
							const cmp = (a, b) => (a == b ? 0 : a < b ? -1 : 1);
							this.badges = (badgesByIssuer[this.issuer.issuerUrl] || [])
								.sort((a, b) => cmp(b.createdAt, a.createdAt));
							resolve();
						},
						(error) => {
							this.messageService.reportAndThrowError(
								`Failed to load badges for ${this.issuer ? this.issuer.name : this.issuerSlug}`,
								error
							);
							resolve();
						}
					);
				});
			},
			(error) => {
				this.messageService.reportLoadingError(`Issuer '${this.issuerSlug}' does not exist.`, error);
			}
		);

		this.groupsLoaded = this.recipientGroupManager.loadRecipientGroupsForIssuer(this.issuerSlug).then(
			(groups) => {
				this.recipientGroups = groups.entities;
			},
			(error) => this.messageService.reportAndThrowError(`Failed to fetch Recipient Groups`, error)
		);

		this.pathwaysLoaded = this.pathwayManager
			.loadPathwaysForIssuer(this.issuerSlug)
			.then((pathways) => (this.pathways = pathways.entities));

		this.profileEmailsLoaded = this.profileManager.userProfilePromise
			.then((profile) => profile.emails.loadedPromise)
			.then((emails) => (this.profileEmails = emails.entities));
	}

	ngOnInit() {
		super.ngOnInit();
	}

	get legacyPathwaysVisible(): boolean {
		return this.pathwaysLoaded && this.pathways.length > 0;
	}

	deleteRecipientGroup(group: RecipientGroup) {
		group
			.deleteRecipientGroup()
			.then(
				() => this.messageService.reportMinorSuccess(`Deleted recipient group ${group.name}`),
				(error) => this.messageService.reportAndThrowError(`Failed to delete recipient group ${group.name}`)
			);
	}

	updateGroupActiveState(recipientGroup: RecipientGroup, active: boolean) {
		recipientGroup.active = active;
		recipientGroup
			.save()
			.then(
				() =>
					this.messageService.reportMinorSuccess(
						`${active ? 'Activated' : 'Deactivated'} recipient group ${recipientGroup.name}`
					),
				(error) =>
					this.messageService.reportAndThrowError(
						`Failed to ${active ? 'activate' : 'deactivate'} recipient group ${recipientGroup.name}`,
						error
					)
			);
	}
}
