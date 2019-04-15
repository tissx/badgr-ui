// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {ProfileEditComponent} from './profile-edit.component';
import {Router, ActivatedRoute} from '@angular/router';
import {SessionService} from '../../../common/services/session.service';
import {FormBuilder} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {MessageService} from '../../../common/services/message.service';
import {UserProfileManager} from '../../../common/services/user-profile-manager.service';
import {AppConfigService} from '../../../common/app-config.service';
import {CommonDialogsService} from '../../../common/services/common-dialogs.service';

@Injectable();
class MockRouter { navigate = jest.fn(); }

@Injectable()
class MockSessionService { }

@Injectable()
class MockMessageService { }

@Injectable()
class MockUserProfileManager { }

@Injectable()
class MockAppConfigService { }

@Injectable()
class MockCommonDialogsService { }

describe('ProfileEditComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfileEditComponent
      ],
      providers: [
        {provide: Router, useClass: MockRouter},
        ActivatedRoute,
        {provide: SessionService, useClass: MockSessionService},
        FormBuilder,
        Title,
        {provide: MessageService, useClass: MockMessageService},
        {provide: UserProfileManager, useClass: MockUserProfileManager},
        {provide: AppConfigService, useClass: MockAppConfigService},
        {provide: CommonDialogsService, useClass: MockCommonDialogsService},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(ProfileEditComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #startEditing()', async () => {
    // const result = component.startEditing();
  });

  it('should run #submitEdit()', async () => {
    // const result = component.submitEdit();
  });

});
