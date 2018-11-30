import {Injectable, Injector} from "@angular/core";
import {
	ApiConfig,
	BadgrConfig,
	FeaturesConfig,
	GoogleAnalyticsConfig,
	HelpConfig
} from "../../environments/badgr-config";
import {environment} from "../../environments/environment";
import {Http} from "@angular/http";


@Injectable()
export class AppConfigService {
	private remoteConfig?: BadgrConfig;

	constructor(
		private injector: Injector,
		private http: Http
	) {}

	loadRemoteConfig() {
		if (! environment.configBaseUrl)
			return Promise.resolve();

		return this.http.get(environment.configBaseUrl + "/" + window.location.hostname + "/config.json")
			.toPromise()
			.then(data => {
				this.remoteConfig = data.json();
			});
	}

	private getConfig<T>(getter: (config: BadgrConfig) => T): T {
		const configProviders: { (): BadgrConfig }[] = [
			() => this.remoteConfig,
			() => environment.defaultConfig
		];

		for (const provider of configProviders) {
			const overall = provider();
			if (typeof overall === "object") {
				const config = getter(overall);

				if (config) {
					return config;
				}
			}
		}

		throw `Could not resolve required config value using ${getter.toString()}. Please ensure that config.js is setup correctly.`
	}

	get apiConfig(): ApiConfig {
		return this.getConfig(config => config.api);
	}

	get featuresConfig(): FeaturesConfig {
		return this.getConfig(config => config.features);
	}

	get helpConfig(): HelpConfig {
		return this.getConfig(config => config.help);
	}

	get googleAnalyticsConfig(): GoogleAnalyticsConfig {
		return this.getConfig(config => (config.googleAnalytics || { trackingId: null }));
	}

	get assertionVerifyUrl(): string {
		return this.getConfig(config => config.assertionVerifyUrl)
	}

	get thm() {
		return this.getConfig(config => config.thm);
	}
}
