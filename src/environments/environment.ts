// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const facebookExternalAuthProvider = {
  'slug': 'facebook',
  'label': 'Facebook',
  'imgSrc': 'https://badgr.io/buttonauth-facebook.660b767f085813a69db8.svg',
  'color': '#4766a9',
};
export const googleExternalAuthProvider = {
  'slug': 'google',
  'label': 'Google',
  'imgSrc': 'https://badgr.io/buttonauth-google.45a4d255a300457b57b6.svg',
  'color': '#fff',
};
export const azureExternalAuthProvider = {
  'slug': 'azure',
  'label': 'Microsoft',
  'imgSrc': 'https://badgr.io/buttonauth-microsoft.40c0b28495ca85559295.svg',
  'color': '#fff',
};
export const linkedinExternalAuthProvider = {
  'slug': 'linkedin_oauth2',
  'label': 'LinkedIn',
  'imgSrc': 'https://badgr.io/buttonauth-linkedin.df788b44d6683054a59b.svg',
  'color': '#0074b3',
};
export const konyExternalAuthProvider = {
  'slug': 'kony',
  'label': 'Kony',
  'imgSrc': 'https://badgr.io/buttonauth-kony.e92a99c01a1fc7a1f83e.svg',
  'color': '#313f49',
};
export const amazonExternalAuthProvider = {
  'slug': 'amazon',
  'label': 'Amazon',
  'imgSrc': 'https://m.media-amazon.com/images/G/01/launchpad/logos/Amazon-logo-white._CB1509666198_.png',
  'color': '#f3ce70',
};

import { BadgrEnvironment } from './badgr-environment';

export const environment: BadgrEnvironment = {
		production: false,
		config: {
			api: {
				baseUrl: "//badgr-server.local",
			},
      features: {
        alternateLandingRedirect: true,
        // deprecated
        socialAccountProviders:
          ['facebook', 'google', 'azure', 'linkedin_oauth2', 'kony', 'amazon'],
        externalAuthProviders: [
          facebookExternalAuthProvider, linkedinExternalAuthProvider,
          googleExternalAuthProvider, azureExternalAuthProvider,
          konyExternalAuthProvider, amazonExternalAuthProvider,
        ]
      },
		}
	}
;
