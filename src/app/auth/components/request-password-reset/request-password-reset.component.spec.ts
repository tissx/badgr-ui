// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {RequestPasswordResetComponent} from './request-password-reset.component';
import {FormBuilder} from '@angular/forms';
import {SessionService} from '../../../common/services/session.service';
import {MessageService} from '../../../common/services/message.service';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
class MockSessionService { }

@Injectable()
class MockMessageService { }

@Injectable()
class MockRouter { /*navigate = jest.fn();*/ }

describe('RequestPasswordResetComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RequestPasswordResetComponent
      ],
      providers: [
        FormBuilder,
        {provide: SessionService, useClass: MockSessionService},
        {provide: MessageService, useClass: MockMessageService},
        ActivatedRoute,
        {provide: Router, useClass: MockRouter},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(RequestPasswordResetComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    // const result = component.ngOnInit();
  });

  it('should run #submitResetRequest()', async () => {
    // const result = component.submitResetRequest();
  });

});
