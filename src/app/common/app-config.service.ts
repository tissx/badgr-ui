import {Injectable, InjectionToken, Injector, NgZone} from '@angular/core';
import {ApiConfig, BadgrConfig, FeaturesConfig, GoogleAnalyticsConfig, HelpConfig} from '../../environments/badgr-config';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BadgrTheme} from '../../theming/badgr-theme';

import * as deepmerge from 'deepmerge';
import {animationFramePromise} from './util/promise-util';
import {initializeTheme} from '../../theming/theme-setup';
import {PackageJson} from 'license-webpack-plugin/dist/PackageJson';

const packageJsonVersion = (require("../../../package.json") as PackageJson).version;

@Injectable()
export class AppConfigService {

	get apiConfig(): ApiConfig {
		return this.config.api;
	}

	get featuresConfig(): FeaturesConfig {
		return this.config.features;
	}

	get helpConfig(): HelpConfig {
		return this.config.help;
	}

	get googleAnalyticsConfig(): GoogleAnalyticsConfig {
		return this.config.googleAnalytics;
	}

	get assertionVerifyUrl(): string {
		return this.config.assertionVerifyUrl;
	}

	get theme(): BadgrTheme {
		return this.config.theme;
	}
	private config: BadgrConfig = defaultConfig;

	constructor(
		private injector: Injector,
		private http: HttpClient,
		private ngZone: NgZone
	) {
		window["initializeBadgrConfig"] = (...args) => ngZone.run(() => this.initializeConfig.apply(this, args));
	}

	async initializeConfig(configOverrides?: Partial<BadgrConfig>) {
		// Build the canonical configuration object by deep merging all config contributors
		this.config = deepmerge.all([
			// The default, base configuration object
			defaultConfig,

			// Configuration overrides from the Angular environment
			environment.config || {},

			// Configuration overrides in Angular's dependency injection. Mostly used for tests.
			this.injector.get(new InjectionToken<Partial<BadgrConfig>>('config'), null) || {},

			// Remote configuration overrides, generally domain-specific from a config server
			await this.loadRemoteConfig() || {},

			// User-specified configuration overrides from local storage
			JSON.parse(localStorage.getItem("config")) || {},

			// User-specified configuration overrides from session storage
			JSON.parse(sessionStorage.getItem("config")) || {},

			// Programmatic Configuration Overrides
			configOverrides || {}
		], {
			clone: true
		}) as BadgrConfig;

		// Initialize theming with the final configuration value
		initializeTheme(this);

		return this.config;
	}


	private async loadRemoteConfig(): Promise<Partial<BadgrConfig> | null> {
		const queryParams = new URLSearchParams(window.location.search);

		// Allow custom remote config information to be added after the angular scripts in index.html.
		await animationFramePromise();

		function getRemoteConfigParam(name, allowQueryParam) {
			return (allowQueryParam && queryParams.get(name))
				|| window.localStorage.getItem(name)
				|| window.sessionStorage.getItem(name)
				|| (() => { const m = document.querySelector(`meta[name=${name}]`); return m && m.getAttribute("content");})();
		}

		// SECURITY NOTE: We do _not_ allow overriding the remote configuration baseUrl with a query param because it could allow an attacker
		// to load badgr with third-party configuration, which could harvest user data or otherwise cause mischief.
		const baseUrl = getRemoteConfigParam("configBaseUrl", false) || (environment.remoteConfig && environment.remoteConfig.baseUrl) || null;
		const version = getRemoteConfigParam("configVersion", true) || (environment.remoteConfig && environment.remoteConfig.version) || null;
		const cacheBust = getRemoteConfigParam("configCacheBust", true) || null;
		const domain = getRemoteConfigParam("configDomain", true) || window.location.hostname;

		if (! baseUrl || ! version || ! domain) {
			return Promise.resolve(null);
		}

		// Request a new copy of the config every hour
		const oneHourMs = 60 * 60 * 1000;
		const timeCode = Math.floor(Date.now() / oneHourMs);

		const configUrl = `${baseUrl}/${version}/${domain}/config.json?v=${packageJsonVersion}&t=${timeCode}&cacheBust=${cacheBust}`;

		return this.http.get(configUrl)
			.toPromise()
			.then(r => {
				return r;
			})
			.catch(
				err => {
					console.error(`Failed to load remote config from ${configUrl}`, err);
					return null;
				}
			);
	}
}

export const defaultConfig: BadgrConfig = {
	api: {
		baseUrl: window.location.protocol + "//" + window.location.hostname + ":8000",
	},
	features: {
		alternateLandingRedirect: false
	},
	help: {
		email: "support@badgr.io"
	},
	googleAnalytics: {
		trackingId: null
	},
	assertionVerifyUrl: "https://badgecheck.io/",
	theme: {
		serviceName: "Badgr",
		welcomeMessage: `### Welcome!`,
		alternateLandingUrl: null,
		showPoweredByBadgr: false,
		showApiDocsLink: true,
		termsOfServiceLink: null,
		termsHelpLink: null,
		privacyPolicyLink: null,
		providedBy: null,
		logoImg: {
			small: require("../../../node_modules/@concentricsky/badgr-style/dist/images/os-logo-small.svg") as string,
			desktop: require("../../../node_modules/@concentricsky/badgr-style/dist/images/os-logo-large.svg") as string,
		},
		loadingImg: {
			// Image is inlined here to avoid any external resource loading, at the expense of a larger initial file size. We only do this for the default theme.
			imageUrl: require("../../../node_modules/@concentricsky/badgr-style/dist/images/os-logo-small.svg") as string,
			height: 48
		},
		favicons: [],
		useColorNavbar: false,
		cssCustomProps: {
			'--color-interactive1' : 'rgb(0,0,0)',
			'--color-interactive2' : 'rgb(20,20,20)',
			'--color-interactive2alpha50' : 'rgba(20,20,20,0.5)',
		}
	}
};
