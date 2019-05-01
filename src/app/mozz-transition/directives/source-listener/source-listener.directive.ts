import { Directive } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Directive({
  selector: '[sourceListener]'
})
export class SourceListenerDirective {

	signupSource: string = null;

	constructor(
		private route: ActivatedRoute,
	) {}

	ngOnInit() {
		const signupSource = this.route.snapshot.queryParamMap.get('signup_source');
		if (signupSource) localStorage.setItem('signupSource', signupSource);
	}

}
