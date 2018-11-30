import {BadgrConfig} from "./badgr-config";

export const environment = {
	production: true,
	configBaseUrl: null,

	defaultConfig: {
		api: {
			baseUrl: window.location.protocol + "//" + window.location.hostname + ":8000",
		},
		features: {
			alternateLandingRedirect: false
		},
		help: {
			email: "support@badgr.io"
		},
		assertionVerifyUrl: "https://badgecheck.io/",
		thm: {}
	} as BadgrConfig
};