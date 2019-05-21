// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
import { COMMON_MOCKS_PROVIDERS_WITH_SUBS } from "../../../mocks/mocks.module.spec";
import { BadgrCommonModule, COMMON_IMPORTS } from "../../../common/badgr-common.module";
import { RouterTestingModule } from "@angular/router/testing";

describe('ProfileComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfileComponent
      ],
			imports: [
				RouterTestingModule,
				CommonModule,
				BadgrCommonModule,
				...COMMON_IMPORTS,
			],
			providers: [
				...COMMON_MOCKS_PROVIDERS_WITH_SUBS,
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
    const result = component.sanitize('url');
  });

  it('should run #ngOnInit()', async () => {
    const result = component.ngOnInit();
  });

  xit('should run #ngOnDestroy()', async () => {
    component.ngOnDestroy();
  });

  xit('should run #unlinkAccount()', async () => {
    // const result = component.unlinkAccount($event, socialAccount, accountsNum);
  });

  xit('should run #linkAccount()', async () => {
    // const result = component.linkAccount($event, info);
  });

  xit('should run #submitEmailForm()', async () => {
    const result = component.submitEmailForm();
  });

  xit('should run #clickConfirmRemove()', async () => {
    // const result = component.clickConfirmRemove(ev, email);
  });

  xit('should run #clickRemove()', async () => {
    // const result = component.clickRemove(ev, email);
  });

  it('should run #clickMakePrimary()', async () => {
    // const result = component.clickMakePrimary(ev, email);
  });

  xit('should run #clickResendVerification()', async () => {
    // const result = component.clickResendVerification(ev, email);
  });

});
