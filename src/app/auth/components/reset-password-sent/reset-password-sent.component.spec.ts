// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {ResetPasswordSent} from './reset-password-sent.component';
import {SessionService} from '../../../common/services/session.service';
import {Router, ActivatedRoute} from '@angular/router';
import {AppConfigService} from '../../../common/app-config.service';

@Injectable()
class MockSessionService { }

@Injectable()
class MockRouter { /*navigate = jest.fn();*/ }

@Injectable()
class MockAppConfigService { }

describe('ResetPasswordSent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResetPasswordSent
      ],
      providers: [
        {provide: SessionService, useClass: MockSessionService},
        {provide: Router, useClass: MockRouter},
        ActivatedRoute,
        {provide: AppConfigService, useClass: MockAppConfigService},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(ResetPasswordSent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    // const result = component.ngOnInit();
  });

});
