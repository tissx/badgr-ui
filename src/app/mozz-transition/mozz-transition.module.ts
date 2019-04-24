import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MozzListenerDirective } from './directives/mozz-listener.directive';
import { ImportModalComponent } from './components/import-modal/import-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
	declarations: [
		MozzListenerDirective,
		ImportModalComponent
	],
	exports: [
		MozzListenerDirective,
		ImportModalComponent
	],
	entryComponents: [
		ImportModalComponent
	],

})
export class MozzTransitionModule { }
