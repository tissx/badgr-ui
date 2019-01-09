import { Component, Input } from "@angular/core";
import { preloadImageURL } from "../util/file-util";

declare function require(path: string): string;

const iconsSvgPath = preloadImageURL(require("../../../../node_modules/@concentricsky/badgr-style/dist/images/icons.svg"));

@Component({
	selector: 'svg[icon]',
	template: `
		<svg:use [attr.xlink:href]="iconHref"></svg:use>
	`
})
export class SvgIconComponent {
	@Input()
	icon: PatternLibraryIconName;

	get iconHref() {
		if (this.icon) {
			return iconsSvgPath + "#" + this.icon;
		} else {
			return "";
		}
	}
}

type PatternLibraryIconName = "icon_add" | "icon_arrow" | "icon_exit_to_app" | "icon_checkmark" | "icon_close" | "icon_collapse" | "icon_complete"
	| "icon_dropdown" | "icon_edit" | "icon_expand" | "icon_group" | "icon_help" | "icon_member" | "icon_more" | "icon_move" | "icon_refresh" | "icon_search" | "icon_share"
	| "icon_sign_out" | "icon_toggle" | "icon_dot" | "icon_error" | "icon_icon_priority_high" | "icon_info";
