// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive, ElementRef} from '@angular/core';
import {FormMessageComponent} from './form-message.component';
import {MessageService} from '../services/message.service';
import { Data, Router } from '@angular/router';
import {EventsService} from '../services/events.service';
import { Subject } from "rxjs";
import { ApiExternalToolLaunchInfo } from "../../externaltools/models/externaltools-api.model";

@Injectable()
class MockMessageService {
	subscribe = (fn: (value: Data) => void) => fn({});
	unsubscribe = (fn: (value: Data) => void) => fn({});
	dismissMessage = () => {};
	getMessage = () => {};
	message$ = {
		subscribe : (fn: (value: Data) => void) => fn({}),
		unsubscribe : (fn: (value: Data) => void) => fn({}),
	};
}

@Injectable()
class MockRouter { /*navigate = jest.fn();*/ }

@Injectable()
class MockElementRef {
  // constructor() { super(undefined); }
  nativeElement = {}
}
@Injectable()
class MockEventsService {
	subscribe = (fn: (value: Event) => void) => fn(new  Event('click'));
	unsubscribe = (fn: (value: Data) => void) => fn({});
	profileEmailsChanged = {subscribe : (fn: (value: Data) => void) => fn({})};
	recipientBadgesStale = {subscribe : (fn: (value: Data) => void) => fn({})};
	documentClicked = new Subject<MouseEvent>();
	/*documentClicked = {
		subscribe : (fn: (value: MouseEvent) => void) => fn(new MouseEvent('click')),
		unsubscribe : (fn: (value: Data) => void) => fn({}),
	};*/
	externalToolLaunch = {subscribe : (fn: (value: Data) => void) => fn({})};
}

// (<any>window).Notification = jest.fn();

fdescribe('FormMessageComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormMessageComponent
      ],
      providers: [
        {provide: MessageService, useClass: MockMessageService},
        {provide: Router, useClass: MockRouter},
        {provide: ElementRef, useClass: MockElementRef},
        {provide: EventsService, useClass: MockEventsService},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(FormMessageComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnDestroy()', async () => {
    const result = component.ngOnDestroy();
  });

  it('should run #ngOnInit()', async () => {
    const result = component.ngOnInit();
  });

  it('should run #onDocumentClick()', async () => {
    const result = component.onDocumentClick(new MouseEvent('click'));
  });

  it('should run #toNotification()', async () => {
    const result = component.toNotification('status');
  });

  it('should run #setMessage()', async () => {
    const result = component.setMessage('message');
  });

  it('should run #dismissMessage()', async () => {
    const result = component.dismissMessage();
  });

});
