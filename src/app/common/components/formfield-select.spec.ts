// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive, ElementRef} from '@angular/core';
import {FormFieldSelect} from './formfield-select';
import {CommonDialogsService} from '../services/common-dialogs.service';

@Injectable()
class MockCommonDialogsService { }

@Injectable()
class MockElementRef {
  // constructor() { super(undefined); }
  nativeElement = {}
}
describe('FormFieldSelect', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormFieldSelect
      ],
      providers: [
        {provide: CommonDialogsService, useClass: MockCommonDialogsService},
        {provide: ElementRef, useClass: MockElementRef},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(FormFieldSelect);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngAfterViewInit()', async () => {
    // const result = component.ngAfterViewInit();
  });

  it('should run #ngOnChanges()', async () => {
    // const result = component.ngOnChanges(changes);
  });

  it('should run #updateDisabled()', async () => {
    // const result = component.updateDisabled();
  });

  it('should run #unlock()', async () => {
    // const result = component.unlock();
  });

  it('should run #cacheControlState()', async () => {
    // const result = component.cacheControlState();
  });

  it('should run #focus()', async () => {
    // const result = component.focus();
  });

  it('should run #select()', async () => {
    // const result = component.select();
  });

  it('should run #handleKeyPress()', async () => {
    // const result = component.handleKeyPress(event);
  });

});
