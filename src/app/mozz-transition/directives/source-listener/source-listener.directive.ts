import { Directive } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { QueryParametersService } from "../../../common/services/query-parameters.service";

@Directive({
  selector: '[sourceListener]'
})
export class SourceListenerDirective {

	getVars = [
		'signup',
		'source',
	];
	getVarSets = [
		'assertion',
	];

	constructor(
		private route: ActivatedRoute,
		private queryParams: QueryParametersService,
	) {}

	ngOnInit() {
		this.getVars.forEach((gv) => this.varSet(gv));
		this.getVarSets.forEach((gv) => this.varPush(gv));
	}

	varSet = (gv) => {
		// const thisVar = this.route.snapshot.queryParamMap.get(gv);
		const thisVar = this.queryParams.queryStringValue(gv, true);
		if (thisVar) localStorage[gv] = thisVar;
	};

	varPush = (key) => {
		const varArr = JSON.parse(localStorage[key] || '[]');
		const theseVars = this.route.snapshot.queryParamMap.getAll(key);
		if (theseVars) {
			theseVars.forEach((val) => varArr.push(val));
			localStorage[key] = JSON.stringify(varArr);
		}
	};

}
