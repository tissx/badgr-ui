// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {ProfileComponent} from './profile.component';
import {Router, ActivatedRoute} from '@angular/router';
import {SessionService} from '../../../common/services/session.service';
import {FormBuilder} from '@angular/forms';
import {Title, DomSanitizer} from '@angular/platform-browser';
import {MessageService} from '../../../common/services/message.service';
import {UserProfileManager} from '../../../common/services/user-profile-manager.service';
import {CommonDialogsService} from '../../../common/services/common-dialogs.service';
import {QueryParametersService} from '../../../common/services/query-parameters.service';
import {AppConfigService} from '../../../common/app-config.service';
import {OAuthApiService} from '../../../common/services/oauth-api.service';

@Injectable()
class MockRouter { navigate = jest.fn(); }

@Injectable()
class MockSessionService { }

@Injectable()
class MockMessageService { }

@Injectable()
class MockUserProfileManager { }

@Injectable()
class MockCommonDialogsService { }

@Injectable()
class MockQueryParametersService { }

@Injectable()
class MockAppConfigService { }

@Injectable()
class MockOAuthApiService { }

describe('ProfileComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfileComponent
      ],
      providers: [
        {provide: Router, useClass: MockRouter},
        ActivatedRoute,
        {provide: SessionService, useClass: MockSessionService},
        FormBuilder,
        Title,
        {provide: MessageService, useClass: MockMessageService},
        {provide: UserProfileManager, useClass: MockUserProfileManager},
        {provide: CommonDialogsService, useClass: MockCommonDialogsService},
        {provide: QueryParametersService, useClass: MockQueryParametersService},
        {provide: AppConfigService, useClass: MockAppConfigService},
        {provide: OAuthApiService, useClass: MockOAuthApiService},
        DomSanitizer,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(ProfileComponent);
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

  it('should run #ngOnDestroy()', async () => {
    // component.ngOnDestroy();
  });

  it('should run #unlinkAccount()', async () => {
    // const result = component.unlinkAccount($event, socialAccount, accountsNum);
  });

  it('should run #linkAccount()', async () => {
    // const result = component.linkAccount($event, info);
  });

  it('should run #submitEmailForm()', async () => {
    // const result = component.submitEmailForm();
  });

  it('should run #clickConfirmRemove()', async () => {
    // const result = component.clickConfirmRemove(ev, email);
  });

  it('should run #clickRemove()', async () => {
    // const result = component.clickRemove(ev, email);
  });

  it('should run #clickMakePrimary()', async () => {
    // const result = component.clickMakePrimary(ev, email);
  });

  it('should run #clickResendVerification()', async () => {
    // const result = component.clickResendVerification(ev, email);
  });

});
