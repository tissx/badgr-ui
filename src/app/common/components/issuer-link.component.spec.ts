// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive, ElementRef} from '@angular/core';
import {BgIssuerLinkComponent} from './issuer-link.component';

@Injectable()
class MockElementRef {
  // constructor() { super(undefined); }
  nativeElement = {}
}
describe('BgIssuerLinkComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BgIssuerLinkComponent
      ],
      providers: [
        {provide: ElementRef, useClass: MockElementRef},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(BgIssuerLinkComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnChanges()', async () => {
    // const result = component.ngOnChanges(changes);
  });

});
