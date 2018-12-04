// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import {BadgrConfig} from "./badgr-config";

export const environment = {
	production: false,
	configBaseUrl: "/",

	defaultConfig: {
		api: {
			baseUrl: window.localStorage.getItem("apiServer") || (window.location.protocol + "//" + window.location.hostname + ":8000"),
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