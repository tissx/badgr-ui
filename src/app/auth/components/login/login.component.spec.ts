// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';
import 'jest'
import {Component, Directive} from '@angular/core';
import {LoginComponent} from './login.component';
import {FormBuilder} from '@angular/forms';
import {Title, DomSanitizer} from '@angular/platform-browser';
import {SessionService} from '../../../common/services/session.service';
import {MessageService} from '../../../common/services/message.service';
import {AppConfigService} from '../../../common/app-config.service';
import {QueryParametersService} from '../../../common/services/query-parameters.service';
import {OAuthManager} from '../../../common/services/oauth-manager.service';
import {ExternalToolsManager} from '../../../externaltools/services/externaltools-manager.service';
import {UserProfileManager} from '../../../common/services/user-profile-manager.service';
import {Router, ActivatedRoute} from '@angular/router';

@Injectable()
class MockSessionService { }

@Injectable()
class MockMessageService { }

@Injectable()
class MockAppConfigService { }

@Injectable()
class MockQueryParametersService { }

@Injectable()
class MockOAuthManager { }

@Injectable()
class MockExternalToolsManager { }

@Injectable()
class MockUserProfileManager { }

@Injectable()
class MockRouter { navigate = jest.fn(); }

describe('LoginComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      providers: [
        FormBuilder,
        Title,
        {provide: SessionService, useClass: MockSessionService},
        {provide: MessageService, useClass: MockMessageService},
        {provide: AppConfigService, useClass: MockAppConfigService},
        {provide: QueryParametersService, useClass: MockQueryParametersService},
        {provide: OAuthManager, useClass: MockOAuthManager},
        {provide: ExternalToolsManager, useClass: MockExternalToolsManager},
        {provide: UserProfileManager, useClass: MockUserProfileManager},
        DomSanitizer,
        {provide: Router, useClass: MockRouter},
        ActivatedRoute,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
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

  it('should run #ngAfterViewInit()', async () => {
    // component.ngAfterViewInit();
  });

  it('should run #submitAuth()', async () => {
    // const result = component.submitAuth();
  });

  it('should run #handleQueryParamCases()', async () => {
    // const result = component.handleQueryParamCases();
  });

  it('should run #initVerifiedData()', async () => {
    // const result = component.initVerifiedData();
  });

});
