import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// HACK: Workaround how array-uniq v1 checks for features... seems hardcoded for node usage. It's needed by sanitize-html.
window['global'] = window;

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
	.catch(err => console.log(err));
