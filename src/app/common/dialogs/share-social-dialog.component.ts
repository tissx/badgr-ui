import {Component, ElementRef, Renderer2} from "@angular/core";

import {SharedObjectType, ShareEndPoint, ShareServiceType, SharingService} from "../services/sharing.service";
import {BaseDialog} from "./base-dialog";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {addQueryParamsToUrl} from "../util/url-util";
import {TimeComponent} from "../components/time.component";
import {generateEmbedHtml} from "../../../embed/generate-embed-html";


@Component({
	selector: 'share-social-dialog',
	templateUrl: './share-social-dialog.html'
})
export class ShareSocialDialog extends BaseDialog {
	options: ShareSocialDialogOptions = {} as any;
	resolveFunc: () => void;
	rejectFunc: () => void;

	selectedVersion: ShareSocialDialogVersionOption | null = null;
	currentTabId: ShareSocialDialogTabId = "link";

	selectedEmbedOption: ShareSocialDialogEmbedOption | null = null;

	includeRecipientIdentifier: boolean = false;
	includeBadgeClassName: boolean = true;
	includeRecipientName: boolean = true;
	includeAwardDate: boolean = true;
	includeVerifyButton: boolean = true;

	constructor(
		componentElem: ElementRef,
		renderer: Renderer2,
		private domSanitizer: DomSanitizer,
		private sharingService: SharingService
	) {
		super(componentElem, renderer);
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Public Dialog API

	openDialog(
		customOptions: ShareSocialDialogOptions
	): Promise<void> {
		this.options = Object.assign({}, customOptions);
		this.showModal();

		this.currentTabId = "link";
		this.selectedEmbedOption = this.options.embedOptions && this.options.embedOptions[0] || null;
		this.selectedVersion = this.options.versionOptions && this.options.versionOptions[0] || null;
		this.cachedEmbedOption = null;
		this.cachedEmbedHtml = null;
		this.currentSafeEmbedHtml = null;

		this.currentEmbedHtml; // trigger html generation before rendering

		this.includeRecipientIdentifier = false;

		return new Promise<void>((resolve, reject) => {
			this.resolveFunc = resolve;
			this.rejectFunc = reject;
		});
	}

	closeDialog() {
		this.closeModal();
		this.resolveFunc();
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Share Window API
	openShareWindow(shareServiceType: ShareServiceType) {
		this.sharingService.shareWithProvider(
			shareServiceType,
			this.options.shareObjectType,
			this.options.shareIdUrl,
			this.currentShareUrl
		);
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Internal API

	get currentShareUrl() {
		let versioned_url = this.selectedVersion
			? this.selectedVersion.shareUrl
			: this.options.shareUrl;

		let params = {};
		params[`identity__${this.options.recipientType || "email"}`] = this.options.recipientIdentifier;
		return (this.includeRecipientIdentifier) ? addQueryParamsToUrl(versioned_url, params) : versioned_url;
	}

	private cachedEmbedOption: ShareSocialDialogEmbedOption | null = null;
	private cachedEmbedHtml: string | null = null;
	currentSafeEmbedHtml: SafeHtml | null = null;

	get currentEmbedHtml(): string | null {
		if (! this.selectedEmbedOption) return null;

		// Cache the generated html because it involves DOM operations and could be slow, as it will be called on every
		// angular update at least twice.
		if (this.selectedEmbedOption == this.cachedEmbedOption)
			return this.cachedEmbedHtml;

		const option = this.selectedEmbedOption;

		// Include information about this embed in the query string so we know about the context later, especially if we
		// need to change how things are displayed, and want old version embeds to work correctly.
		// See [[ EmbedService ]] for the consumption of these parameters
		let embedUrlWithParams = addQueryParamsToUrl(
			option.embedUrl,
			{
				embedVersion: option.embedVersion,
				embedWidth: option.embedSize.width,
				embedHeight: option.embedSize.height,
			}
		);
		if (this.includeRecipientIdentifier && this.options.recipientIdentifier) {
			let params = {};
			params[`identity__${this.options.recipientType || "email"}`] = this.options.recipientIdentifier;
			embedUrlWithParams = addQueryParamsToUrl(embedUrlWithParams, params);
		}

		const outerContainer = document.createElement("div");
		let containerElem: HTMLElement = outerContainer;


		// Create the embedded HTML fragment by generating an element and grabbing innerHTML. This avoids us having to
		// deal with any HTML-escape issues, which are hard to get right, and for which there aren't any built-in functions.
		switch (option.embedType) {
			case "iframe": {
				const iframe = document.createElement("iframe");
				iframe.src = embedUrlWithParams;
				iframe.style.width = option.embedSize.width + "px";
				iframe.style.height = option.embedSize.height + "px";
				iframe.style.border = "0";

				if (option.embedTitle) {
					iframe.title = option.embedTitle;
				}

				containerElem.appendChild(iframe);
			} break;

			case "image": {

				const blockquote = generateEmbedHtml({
					shareUrl: this.currentShareUrl,
					imageUrl: option.embedUrl,
					includeBadgeClassName: this.includeBadgeClassName,
					includeAwardDate: this.includeAwardDate,
					includeRecipientName: this.includeRecipientName,
					includeVerifyButton: this.includeVerifyButton,
					badgeClassName: option.embedBadgeName,
					awardDate: TimeComponent.datePipe.transform(option.embedAwardDate),
					recipientName: option.embedRecipientName,
					recipientIdentifier: this.includeRecipientIdentifier ? this.options.recipientIdentifier : undefined,
					includeScript: true,
				});

				containerElem.appendChild(blockquote);
			} break;
		}

		this.cachedEmbedOption = this.selectedEmbedOption;
		this.cachedEmbedHtml = outerContainer.innerHTML;
		this.currentSafeEmbedHtml = this.domSanitizer.bypassSecurityTrustHtml(outerContainer.innerHTML);

		if (option.embedType == "image") {
			this.cachedEmbedHtml = this.stripStyleTags(this.cachedEmbedHtml);
		}

		return this.cachedEmbedHtml;
	}

	stripStyleTags(htmlstr: string): string {
		return htmlstr.replace(/ ?style="[^"]*"/g, '');
	}

	get hasEmbedSupport() {
		return this.options.embedOptions && this.options.embedOptions.length;
	}

	displayShareServiceType(serviceType: ShareServiceType) {
		if (this.options.excludeServiceTypes) {
			return this.options.excludeServiceTypes.indexOf(serviceType) == -1;
		}
		return true;
	}

	openTab(tabId: ShareSocialDialogTabId) {
		this.currentTabId = tabId;
	}

	copySupported(): boolean {
		try {
			return document.queryCommandSupported('copy');
		} catch(e) {
			return false;
		}
	}

	copyToClipboard(input: HTMLInputElement) {
		// Inspired by https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript

		const inputWasDisabled = input.disabled;
		input.disabled = false;
		input.select();

		// Invoke browser support
		try {
			if (document.execCommand('copy')) {
				return;
			}
		} catch (err) {

		} finally {
			input.disabled = inputWasDisabled;
		}
	}

	updatePreview(ev) {
		this.cachedEmbedOption = null;
		this.cachedEmbedHtml = null;
		this.currentSafeEmbedHtml = null;
		this.currentEmbedHtml; // trigger html generation
	}
}

export interface ShareSocialDialogOptions {
	title: string;
	shareObjectType: SharedObjectType;
	imageUrl?: string;
	shareUrl: string;
	shareIdUrl: string;
	shareTitle: string;
	shareSummary: string;
	shareEndpoint: ShareEndPoint;

	versionOptions?: ShareSocialDialogVersionOption[];
	versionInfoTitle?: string;
	versionInfoBody?: string;

	excludeServiceTypes?: ShareServiceType[];

	embedOptions: ShareSocialDialogEmbedOption[];

	recipientIdentifier?: string;
	recipientType?: string;
	showRecipientOptions?: boolean;
}

/**
 * Defines a "version" for a sharable link which will be displayed on the link page.
 */
export interface ShareSocialDialogVersionOption {
	label: string;
	shareUrl: string;
}

/**
 * Defines an embedding option for the share dialog.
 */
export interface ShareSocialDialogEmbedOption {
	/**
	 * Human-readable label for the radio button
	 */
	label: string;

	/**
	 * Human-readable alt/title text for the embedded object.
	 */
	embedTitle: string;

	/**
	 * URL to be displayed in the embed
	 */
	embedUrl: string;

	/**
	 * URL to link the embedded object to.
	 */
	embedLinkUrl: string;

	/**
	 * How the embed URL should be referenced.
	 * iframe - embeds the `embedUrl` as an iframe
	 * image - embeds the `embedUrl` as an image
	 */
	embedType: "iframe" | "image";

	/**
	 * Version of the embedded view. This is used so that future changes to embedded views won't break old versions
	 * that may be expecting a different `embedSize` or `embedType` than the old version.
	 */
	embedVersion: number;

	/**
	 * Size of the embedded content. Measured in logical pixels.
	 */
	embedSize: { width: number; height: number }

	embedBadgeName?: string;
	embedAwardDate?: Date;
	embedRecipientName?: string;
	embedRecipientIdentifier?: string;
}

type ShareSocialDialogTabId = "link" | "social" | "embed";