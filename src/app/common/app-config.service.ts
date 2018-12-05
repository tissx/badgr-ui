import {Injectable, InjectionToken, Injector} from "@angular/core";
import {
	ApiConfig,
	BadgrConfig,
	FeaturesConfig,
	GoogleAnalyticsConfig,
	HelpConfig
} from "../../environments/badgr-config";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AppConfigService {
	private remoteConfig?: BadgrConfig;

	private configProviders: { (): BadgrConfig }[] = [
		() => this.injector.get(new InjectionToken<BadgrConfig>('config'), null),
		() => this.remoteConfig,
		() => environment.defaultConfig
	];

	constructor(
		private injector: Injector,
		private http: HttpClient
	) {}

	loadRemoteConfig() {
		if (! environment.configBaseUrl)
			return Promise.resolve();

		const configUrl = environment.configBaseUrl + window.location.hostname + "/config.json";

		return this.http.get(configUrl)
			.toPromise()
			.then(
				data => this.remoteConfig = data,
				err => console.warn(`Failed to load remote config from ${configUrl}`, err)
			);
	}

	private getConfig<T>(getter: (config: BadgrConfig) => T): T {
		for (const provider of this.configProviders) {
			const overall = provider();
			if (overall && typeof overall === "object") {
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
