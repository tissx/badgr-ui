// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {ChangePasswordComponent} from './change-password.component';
import {FormBuilder} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {SessionService} from '../../../common/services/session.service';
import {UserProfileManager} from '../../../common/services/user-profile-manager.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppConfigService} from '../../../common/app-config.service';
import {MessageService} from '../../../common/services/message.service';

@Injectable()
class MockSessionService { }

@Injectable()
class MockUserProfileManager { }

@Injectable();
class MockRouter { navigate = jest.fn(); }

@Injectable()
class MockAppConfigService { }

@Injectable()
class MockMessageService { }

describe('ChangePasswordComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChangePasswordComponent
      ],
      providers: [
        FormBuilder,
        Title,
        {provide: SessionService, useClass: MockSessionService},
        {provide: UserProfileManager, useClass: MockUserProfileManager},
        ActivatedRoute,
        {provide: Router, useClass: MockRouter},
        {provide: AppConfigService, useClass: MockAppConfigService},
        {provide: MessageService, useClass: MockMessageService},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #submitChange()', async () => {
    // const result = component.submitChange();
  });

  it('should run #forgotPassword()', async () => {
    // const result = component.forgotPassword();
  });

  it('should run #passwordsMatch()', async () => {
    // const result = component.passwordsMatch();
  });

  it('should run #cancel()', async () => {
    // const result = component.cancel();
  });

});
