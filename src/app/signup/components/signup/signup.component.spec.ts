// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {SignupComponent} from './signup.component';
import {FormBuilder} from '@angular/forms';
import {Title, DomSanitizer} from '@angular/platform-browser';
import {MessageService} from '../../../common/services/message.service';
import {AppConfigService} from '../../../common/app-config.service';
import {SessionService} from '../../../common/services/session.service';
import {SignupService} from '../../services/signup.service';
import {OAuthManager} from '../../../common/services/oauth-manager.service';
import {Router, ActivatedRoute} from '@angular/router';

@Injectable()
class MockMessageService { }

@Injectable()
class MockAppConfigService { }

@Injectable()
class MockSessionService { }

@Injectable()
class MockSignupService { }

@Injectable()
class MockOAuthManager { }

@Injectable()
class MockRouter { /*navigate = jest.fn();*/ }

describe('SignupComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SignupComponent
      ],
      providers: [
        FormBuilder,
        Title,
        {provide: MessageService, useClass: MockMessageService},
        {provide: AppConfigService, useClass: MockAppConfigService},
        {provide: SessionService, useClass: MockSessionService},
        {provide: SignupService, useClass: MockSignupService},
        {provide: OAuthManager, useClass: MockOAuthManager},
        DomSanitizer,
        {provide: Router, useClass: MockRouter},
        ActivatedRoute,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #sanitize()', async () => {
    // const result = component.sanitize(url);
  });

  it('should run #ngOnInit()', async () => {
    // const result = component.ngOnInit();
  });

  it('should run #onSubmit()', async () => {
    // const result = component.onSubmit();
  });

  it('should run #sendSignupConfirmation()', async () => {
    // const result = component.sendSignupConfirmation(email);
  });

  it('should run #passwordsMatch()', async () => {
    // const result = component.passwordsMatch();
  });

});
