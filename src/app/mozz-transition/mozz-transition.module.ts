import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MozzListenerDirective } from './directives/mozz-listener.directive';
import { ImportModalComponent } from './components/import-modal/import-modal.component';
import { SourceListenerDirective } from "./directives/source-listener/source-listener.directive";

@NgModule({
  imports: [
    CommonModule
  ],
	declarations: [
		MozzListenerDirective,
		SourceListenerDirective,
		ImportModalComponent
	],
	exports: [
		MozzListenerDirective,
		SourceListenerDirective,
		ImportModalComponent
	],
	entryComponents: [
		ImportModalComponent
	],

})
export class MozzTransitionModule { }
