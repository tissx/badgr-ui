import {BadgrEnvironment} from './badgr-environment';

export const environment: BadgrEnvironment = {
	production: true,
	config: undefined,
	remoteConfig: {
		baseUrl: "http://static.badgr.io/csky-badgr-ui-config",
		version: "latest",
	}
};
