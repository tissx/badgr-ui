import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { preloadImageURL } from '../../../common/util/file-util';
import { PublicApiService } from '../../services/public-api.service';
import { LoadedRouteParam } from '../../../common/util/loaded-route-param';
import {
	PublicApiBadgeAssertionWithBadgeClass,
	PublicApiBadgeClass,
	PublicApiIssuer
} from '../../models/public-api.model';
import { EmbedService } from '../../../common/services/embed.service';
import { routerLinkForUrl } from '../public/public.component';
import { QueryParametersService } from '../../../common/services/query-parameters.service';
import { MessageService } from '../../../common/services/message.service';
import { AppConfigService } from '../../../common/app-config.service';
import { saveAs } from 'file-saver';
import { Title } from '@angular/platform-browser';
import { compareDate } from "../../../common/util/date-compare";
import { CommonDialogsService } from '../../../common/services/common-dialogs.service';


@Component({
	templateUrl: './badge-assertion.component.html'
})
export class PublicBadgeAssertionComponent {
	readonly issuerImagePlacholderUrl = preloadImageURL(
		require('../../../../breakdown/static/images/placeholderavatar-issuer.svg') as string
	);
	readonly badgeLoadingImageUrl = require('../../../../breakdown/static/images/badge-loading.svg') as string;
	readonly badgeFailedImageUrl = require('../../../../breakdown/static/images/badge-failed.svg') as string;

	assertionIdParam: LoadedRouteParam<PublicApiBadgeAssertionWithBadgeClass>;
	assertionId: string;
	awardedToDisplayName: string;
	routerLinkForUrl = routerLinkForUrl;
	now = new Date();
	compareDate = compareDate;
	tense = {
		'expires': {
			'=1' : 'Expired',
			'=0' : 'Expires',
		},
	};

	showV2EmbedDescription = false;

	constructor(
		private injector: Injector,
		public embedService: EmbedService,
		public messageService: MessageService,
		public configService: AppConfigService,
		public queryParametersService: QueryParametersService,
		private title: Title,
		private dialogService: CommonDialogsService,
	) {
		title.setTitle(`Assertion - ${this.configService.theme['serviceName'] || "Badgr"}`);

		this.assertionIdParam = new LoadedRouteParam(
			injector.get(ActivatedRoute),
			"assertionId",
			paramValue => {
				this.assertionId = paramValue;
				const service: PublicApiService = injector.get(PublicApiService);
				return service.getBadgeAssertion(paramValue).then(assertion => {
					if (assertion.revoked) {
						if (assertion.revocationReason) {
							messageService.reportFatalError("Assertion has been revoked:", assertion.revocationReason);
						} else {
							messageService.reportFatalError("Assertion has been revoked.", "");
						}
					} else if (this.showDownload) {
						this.openSaveDialog(assertion);
					}
					if (assertion["extensions:recipientProfile"] && assertion["extensions:recipientProfile"].name) {
						this.awardedToDisplayName = assertion["extensions:recipientProfile"].name;
					}
					return assertion;
				});
			}
		);
	}

	get showDownload() {
		return this.queryParametersService.queryStringValue("action") === "download";
	}

	get assertion(): PublicApiBadgeAssertionWithBadgeClass { return this.assertionIdParam.value; }

	get badgeClass(): PublicApiBadgeClass { return this.assertion.badge; }

	get issuer(): PublicApiIssuer { return this.assertion.badge.issuer; }

	get isExpired(): boolean {
		return !this.assertion.expires || new Date(this.assertion.expires) < new Date();
	}

	private get rawJsonUrl() {
		return `${this.configService.apiConfig.baseUrl}/public/assertions/${this.assertionId}.json`;
	}

	get rawBakedUrl() {
		return `${this.configService.apiConfig.baseUrl}/public/assertions/${this.assertionId}/baked`;
	}

	get verifyUrl() {
		let url = `${this.configService.assertionVerifyUrl}?url=${this.rawJsonUrl}`;

		for (const IDENTITY_TYPE of ['identity__email', 'identity__url', 'identity__telephone']) {
			const identity = this.queryParametersService.queryStringValue(IDENTITY_TYPE);
			if (identity) {
				url = `${url}&${IDENTITY_TYPE}=${identity}`;
			}
		}
		return url;
	}

	verifyBadge() {
		this.dialogService.verifyBadgeDialog.openDialog(this.assertion);
	}

	get recipientId() {
		const i = this.queryParametersService.queryStringValue("i");
		let recipientIdentifierString = i;

		for (const IDENTITY_TYPE of ['identity__email', 'identity__url', 'identity__telephone']) {
			const identity = this.queryParametersService.queryStringValue(IDENTITY_TYPE);
			if (identity) {
				recipientIdentifierString = `${i}&${IDENTITY_TYPE}=${identity}`;
			}
		}
		return recipientIdentifierString;
	}

	generateFileName(assertion, fileExtension): string {
		return `${assertion.badge.name} - ${assertion.recipient.identity}${fileExtension}`;
	}

	toggleShowV2EmbedDescription() {
		this.showV2EmbedDescription = !this.showV2EmbedDescription;
	}

	openSaveDialog(assertion): void {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", assertion.image, true);
		xhr.responseType = "blob";
		xhr.onload = (e) => {
			if (xhr.status === 200) {
				const fileExtension = this.mimeToExtension(xhr.response.type);
				const name = this.generateFileName(assertion, fileExtension);
				saveAs(xhr.response, name);
			}
		};
		xhr.send();
	}

	mimeToExtension(mimeType: string): string {
		if (mimeType.indexOf('svg') !== -1) return ".svg";
		if (mimeType.indexOf('png') !== -1) return ".png";
		return "";
	}
}
