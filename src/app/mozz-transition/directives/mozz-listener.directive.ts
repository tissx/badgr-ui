import { ComponentFactoryResolver, Directive, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ImportModalComponent } from "../components/import-modal/import-modal.component";

@Directive({
  selector: '[mozzListener]'
})
export class MozzListenerDirective {

	signupSource: string = null;
	//@ViewChild(AdDirective) adHost: AdDirective;

	constructor(
		public viewContainerRef: ViewContainerRef,
		private route: ActivatedRoute,
		private componentFactoryResolver: ComponentFactoryResolver
	) {}

	ngOnInit() {
		this.signupSource = this.route.snapshot.queryParamMap.get('signup_source');
		if (this.signupSource === 'mozilla') {
			localStorage.setItem('signupSource', this.signupSource);
			const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ImportModalComponent);
			const viewContainerRef = this.viewContainerRef;
			viewContainerRef.clear();
			const componentRef = viewContainerRef.createComponent(componentFactory);
		}
	}

}
