import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MozzListenerDirective } from './mozz-listener.directive';

@NgModule({
  imports: [
    CommonModule
  ],
	declarations: [
		MozzListenerDirective
	],
	exports: [
		MozzListenerDirective
	],

})
export class MozzTransitionModule { }
