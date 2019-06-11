import { Component, OnInit } from '@angular/core';
import { preloadImageURL } from "../../../common/util/file-util";
import { BaseAuthenticatedRoutableComponent } from "../../../common/pages/base-authenticated-routable.component";
import { ActivatedRoute, Router } from "@angular/router";
import { SessionService } from "../../../common/services/session.service";
import { AppConfigService } from "../../../common/app-config.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent extends BaseAuthenticatedRoutableComponent implements OnInit {

	constructor(
		router: Router,
		route: ActivatedRoute,
		sessionService: SessionService,

		public configService: AppConfigService,
	) {
		super(router, route, sessionService);
	}

  ngOnInit() {
		localStorage.removeItem('signup');
		super.ngOnInit();
  }

	readonly imageBadge = preloadImageURL(require("../../../../../node_modules/@concentricsky/badgr-style/dist/images/graphic-badge.svg") as string);
	readonly imageBackpack = preloadImageURL(require("../../../../../node_modules/@concentricsky/badgr-style/dist/images/graphic-backpack.svg") as string);
	readonly imageCollections = preloadImageURL(require("../../../../../node_modules/@concentricsky/badgr-style/dist/images/graphic-collections.svg") as string);
	readonly imageIssuer = preloadImageURL(require("../../../../../node_modules/@concentricsky/badgr-style/dist/images/graphic-issuer.svg") as string);

}



