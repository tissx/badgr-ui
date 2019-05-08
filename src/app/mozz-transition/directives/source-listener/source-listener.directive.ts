import { Directive } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Directive({
  selector: '[sourceListener]'
})
export class SourceListenerDirective {

	getVars = [
		'signup_source',
		'signup',
		'source',
	];

	constructor(
		private route: ActivatedRoute,
	) {}

	ngOnInit() {
		this.getVars.forEach((gv) => this.varSet(gv));
	}

	varSet = (gv) => {
		const thisVar = this.route.snapshot.queryParamMap.get(gv);
		if (thisVar) localStorage.setItem(gv, thisVar);
	}

}
