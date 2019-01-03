import { AfterViewInit, Component, Directive, ElementRef, Input, NgZone, Renderer2 } from "@angular/core";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import Popper, { Placement } from "popper.js";

/**
 * Directive that implements popper.js-based popup menus
 */
@Component({
	selector: 'bg-popup-menu',
	template: '<ng-content></ng-content>',
	host: {
		"class": "menu",
		"(window:click)": "handleClick($event)",
		"[attr.inert]": "(! isOpen) || undefined"
	}
})
export class BgPopupMenu implements OnDestroy, AfterViewInit, OnDestroy {
	public triggerData: any = null;
	private popper: Popper | null = null;
	private lastTriggerElem: HTMLElement | null = null;

	@Input()
	closeOnOutsideClick: boolean = true;

	@Input()
	closeOnInsideClick: boolean = true;

	@Input()
	menuPlacement: Placement = "bottom-end";

	constructor(
		private componentElemRef: ElementRef,
		private renderer: Renderer2,
		private ngZone: NgZone
	) {}

	get componentElem(): HTMLElement { return this.componentElemRef.nativeElement ! as HTMLElement }

	open(
		triggerElem: HTMLElement
	) {
		this.lastTriggerElem = triggerElem;

		if (! this.popper) {
			// Create the popper outside of Angular so that the popper event handlers don't trigger angular updates
			this.ngZone.runOutsideAngular(() => {
				this.popper = new Popper(
					triggerElem || document.body,
					this.componentElem!,
					{
						placement: this.menuPlacement,
						onCreate: () => {
							const firstTabbable =  this.componentElem.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]');
							if (firstTabbable) (firstTabbable as any).focus();
						}
					}
				);
			});
		}

		this.componentElem.style.display = "";
		this.componentElem.classList.toggle("menu-is-open", true);
	}

	close() {
		this.componentElem.classList.toggle("menu-is-open", false);

		if (this.popper) {
			this.popper.destroy();
			this.popper = null;

			this.hideElem();
		}
	}

	private hideElem() {
		this.componentElem.style.position = "absolute";
		this.componentElem.style.top = "-1000px";
		this.componentElem.style.left = "-1000px";
	}

	toggle(triggerElem: HTMLElement) {
		if (!this.isOpen || this.lastTriggerElem != triggerElem) {
			if (this.isOpen) this.close();

			this.open(triggerElem);
		} else if (this.isOpen) {
			this.close();
		}
	}

	get isOpen() {
		return this.componentElem && this.componentElem.classList.contains("menu-is-open");
	}

	ngAfterViewInit(): void {
		// Move the dropdown element to the body so it can be positioned properly
		document.body.appendChild(this.componentElem!);
		this.hideElem();
	}

	ngOnDestroy(): void {
		this.componentElem && this.componentElem.remove();

		if (this.popper) {
			this.popper.destroy();
		}
	}

	handleClick(event: Event) {
		if (this.componentElem) {

			if (this.lastTriggerElem && this.lastTriggerElem.contains(event.target as Node)) {
				return;
			}

			if (this.componentElem.contains(event.target as Node)) {
				if (this.closeOnInsideClick) {
					this.close();
				}
			} else if (this.closeOnOutsideClick) {
				this.close();
			}
		}
	}
}

@Directive({
	selector: '[bgPopupMenuTrigger]',
	host: {
		"(click)": "handleClick()"
	}
})
export class BgPopupMenuTriggerDirective {
	@Input("bgPopupMenuTrigger")
	private menu: BgPopupMenu | null = null;

	@Input("bgPopupMenuData")
	private triggerData: any = null;

	constructor(
		private componentElemRef: ElementRef
	) {}

	handleClick() {
		if (this.menu) {
			this.menu.triggerData = this.triggerData;
			this.menu.toggle(this.componentElemRef.nativeElement as HTMLElement);
		}
	}
}
