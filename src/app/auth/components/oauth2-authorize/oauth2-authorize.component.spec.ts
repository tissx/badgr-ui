// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {OAuth2AuthorizeComponent} from './oauth2-authorize.component';
import {Router, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {MessageService} from '../../../common/services/message.service';
import {SessionService} from '../../../common/services/session.service';
import {OAuthManager} from '../../../common/services/oauth-manager.service';
import {QueryParametersService} from '../../../common/services/query-parameters.service';
import {AppConfigService} from '../../../common/app-config.service';
import {InitialLoadingIndicatorService} from '../../../common/services/initial-loading-indicator.service';

@Injectable()
class MockRouter { /*navigate = jest.fn();*/ }

@Injectable()
class MockMessageService { }

@Injectable()
class MockSessionService { }

@Injectable()
class MockOAuthManager { }

@Injectable()
class MockQueryParametersService { }

@Injectable()
class MockAppConfigService { }

@Injectable()
class MockInitialLoadingIndicatorService { }

describe('OAuth2AuthorizeComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        OAuth2AuthorizeComponent
      ],
      providers: [
        {provide: Router, useClass: MockRouter},
        ActivatedRoute,
        Title,
        {provide: MessageService, useClass: MockMessageService},
        {provide: SessionService, useClass: MockSessionService},
        {provide: OAuthManager, useClass: MockOAuthManager},
        {provide: QueryParametersService, useClass: MockQueryParametersService},
        {provide: AppConfigService, useClass: MockAppConfigService},
        {provide: InitialLoadingIndicatorService, useClass: MockInitialLoadingIndicatorService},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(OAuth2AuthorizeComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #iconName()', async () => {
    // const result = component.iconName(scopeCssName);
  });

  it('should run #cancelAuthorization()', async () => {
    // const result = component.cancelAuthorization();
  });

  it('should run #authorizeApp()', async () => {
    // const result = component.authorizeApp();
  });

  it('should run #ngOnInit()', async () => {
    // const result = component.ngOnInit();
  });

});
