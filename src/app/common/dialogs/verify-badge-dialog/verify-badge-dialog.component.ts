import { BaseDialog } from '../base-dialog';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { PublicApiBadgeAssertionWithBadgeClass } from '../../../public/models/public-api.model';
import { QueryParametersService } from '../../services/query-parameters.service';
import { AppConfigService } from '../../app-config.service';
import { preloadImageURL } from '../../util/file-util';

const sha256 = require('tiny-sha256') as (email: string) => string;

export enum AwardedState {
	'MATCH' = 'match',
	'NO_MATCH' = 'noMatch',
	'NOT_VERIFIED' = 'notVerified'
}

export enum ExpiryState {
	'EXPIRED' = 'expired',
	'NOT_EXPIRED' = 'notExpired',
	'NEVER_EXPIRES' ='neverExpires'
}

@Component({
	selector: 'verify-badge-dialog',
	templateUrl: './verify-badge-dialog.component.html'
})
export class VerifyBadgeDialog extends BaseDialog {

	constructor(
		componentElem: ElementRef,
		public queryParamService: QueryParametersService,
		renderer: Renderer2,
	){
		super(componentElem, renderer);
	}

	get identityEmail(): string {
		return this.queryParamService.queryStringValue('identity__email');
	}

	get isBadgeVerified() {
		return this.awardedState !== AwardedState.NO_MATCH && this.expiryState !== ExpiryState.EXPIRED;
	}

	get verifyUrl() {
		return `https://badgecheck.io/?url=${this.badgeAssertion.id}.json&identity__email==${this.identityEmail}`;
	}

	badgeAssertion: PublicApiBadgeAssertionWithBadgeClass = null;

	readonly issuerImagePlacholderUrl = preloadImageURL(
		require('../../../../breakdown/static/images/placeholderavatar-issuer.svg') as string
	);

	readonly badgeLoadingImageUrl = require('../../../../breakdown/static/images/badge-loading.svg') as string;

	readonly badgeFailedImageUrl = require('../../../../breakdown/static/images/badge-failed.svg') as string;

	//exposes enums to the template
	readonly AWARDED_STATES = AwardedState;

	readonly EXPIRY_STATES = ExpiryState;

	awardedState: AwardedState;

	expiryState: ExpiryState;

	openDialog( badge: PublicApiBadgeAssertionWithBadgeClass ) {
		this.showModal();

		this.verifyBadge(badge)
			.then( b => this.doValidations(b));
	}

	verifyBadge(badge: PublicApiBadgeAssertionWithBadgeClass): Promise<PublicApiBadgeAssertionWithBadgeClass>{
		return new Promise<PublicApiBadgeAssertionWithBadgeClass>( resolve => setTimeout( () => resolve(badge), 1000));
	}

	private doValidations(ba: PublicApiBadgeAssertionWithBadgeClass){
		this.badgeAssertion = ba;
		this.verifyEmail();
		this.verifyExpiresOn();
	}

	private verifyEmail() {
		if (!this.identityEmail) {
			this.awardedState = AwardedState.NOT_VERIFIED;
		}
		else if (this.badgeAssertion.recipient.hashed) {
			// hashed is true
			const hashedEmail = 'sha256$'+sha256( `${this.identityEmail}${this.badgeAssertion.recipient.salt}`);
			this.awardedState = hashedEmail === this.badgeAssertion.recipient.identity
			                    ? AwardedState.MATCH
			                    : AwardedState.NO_MATCH;
		}
		else {
			// hashed is false, identity is in plain text
			this.awardedState = AwardedState.MATCH;
		}
	}

	private verifyExpiresOn() {
		if (!this.badgeAssertion.expires) {
			this.expiryState = ExpiryState.NEVER_EXPIRES;
		}
		else {
			this.expiryState = new Date(this.badgeAssertion.expires) > new Date()
			                   ? ExpiryState.EXPIRED
			                   : ExpiryState.NOT_EXPIRED;
		}
	}

	closeDialog() {
		this.closeModal();
	}
}
