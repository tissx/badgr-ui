import { ComponentFactoryResolver, Directive, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ImportModalComponent } from "../../components/import-modal/import-modal.component";

@Directive({
  selector: '[importLauncher]'
})
export class ImportLauncherDirective implements OnInit{

	constructor(
		public viewContainerRef: ViewContainerRef,
		private route: ActivatedRoute,
		private componentFactoryResolver: ComponentFactoryResolver
	) {}

	ngOnInit() {
		if (localStorage.getItem('signupSource') === 'mozilla') {
			//localStorage.removeItem('signupSource');
			const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ImportModalComponent);
			const viewContainerRef = this.viewContainerRef;
			viewContainerRef.clear();
			viewContainerRef.createComponent(componentFactory);
		}
	}

}
