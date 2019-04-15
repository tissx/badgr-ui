// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {TooltipComponent} from './tooltip.component';
import {ElementRef} from 'tether';

@Injectable()
class MockElementRef {
  // constructor() { super(undefined); }
  nativeElement = {}
}
describe('TooltipComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TooltipComponent
      ],
      providers: [
        {provide: ElementRef, useClass: MockElementRef},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #toggleTip()', async () => {
    // const result = component.toggleTip();
  });

  it('should run #onOutClick()', async () => {
    // const result = component.onOutClick(targetElement);
  });

  it('should run #updateTip()', async () => {
    // const result = component.updateTip(open);
  });

  it('should run #ngAfterViewInit()', async () => {
    // const result = component.ngAfterViewInit();
  });

  it('should run #ngOnDestroy()', async () => {
    // const result = component.ngOnDestroy();
  });

});
