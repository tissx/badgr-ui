import { Component, OnInit } from '@angular/core';
import { preloadImageURL } from "../../../common/util/file-util";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

	readonly imageBadge = preloadImageURL(require("../../../../../node_modules/@concentricsky/badgr-style/dist/images/graphic-badge.svg") as string);
	readonly imageBackpack = preloadImageURL(require("../../../../../node_modules/@concentricsky/badgr-style/dist/images/graphic-backpack.svg") as string);
	readonly imageCollections = preloadImageURL(require("../../../../../node_modules/@concentricsky/badgr-style/dist/images/graphic-collections.svg") as string);
	readonly imageIssuer = preloadImageURL(require("../../../../../node_modules/@concentricsky/badgr-style/dist/images/graphic-issuer.svg") as string);

}



