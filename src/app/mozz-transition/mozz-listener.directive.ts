import { Directive, ElementRef } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Directive({
  selector: '[mozzListener]'
})
export class MozzListenerDirective {

	isMozz: string = null;

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.isMozz = this.route.snapshot.queryParamMap.get('mozz');
		if (this.isMozz) {
			console.log('!!!');
		}
	}

}
