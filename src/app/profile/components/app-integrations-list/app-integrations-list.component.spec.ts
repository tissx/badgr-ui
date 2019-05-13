// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {AppIntegrationListComponent} from './app-integrations-list.component';
import {SessionService} from '../../../common/services/session.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {MessageService} from '../../../common/services/message.service';
import {AppIntegrationManager} from '../../services/app-integration-manager.service';
import {OAuthManager} from '../../../common/services/oauth-manager.service';
import {AppConfigService} from '../../../common/app-config.service';
import {CommonDialogsService} from '../../../common/services/common-dialogs.service';

@Injectable()
class MockSessionService { }

@Injectable()
class MockRouter { /*navigate = jest.fn();*/ }

@Injectable()
class MockMessageService { }

@Injectable()
class MockAppIntegrationManager { }

@Injectable()
class MockOAuthManager { }

@Injectable()
class MockAppConfigService { }

@Injectable()
class MockCommonDialogsService { }

describe('AppIntegrationListComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppIntegrationListComponent
      ],
      providers: [
        {provide: SessionService, useClass: MockSessionService},
        {provide: Router, useClass: MockRouter},
        ActivatedRoute,
        Title,
        {provide: MessageService, useClass: MockMessageService},
        {provide: AppIntegrationManager, useClass: MockAppIntegrationManager},
        {provide: OAuthManager, useClass: MockOAuthManager},
        {provide: AppConfigService, useClass: MockAppConfigService},
        {provide: CommonDialogsService, useClass: MockCommonDialogsService},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppIntegrationListComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    // const result = component.ngOnInit();
  });

  it('should run #revokeApp()', async () => {
    // const result = component.revokeApp(app);
  });

});
