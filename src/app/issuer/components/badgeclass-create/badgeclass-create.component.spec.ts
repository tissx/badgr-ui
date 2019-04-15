// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {BadgeClassCreateComponent} from './badgeclass-create.component';
import {SessionService} from '../../../common/services/session.service';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {MessageService} from '../../../common/services/message.service';
import {IssuerManager} from '../../services/issuer-manager.service';
import {AppConfigService} from '../../../common/app-config.service';
import {CommonDialogsService} from '../../../common/services/common-dialogs.service';

@Injectable()
class MockSessionService { }

@Injectable();
class MockRouter { navigate = jest.fn(); }

@Injectable()
class MockMessageService { }

@Injectable()
class MockIssuerManager { }

@Injectable()
class MockAppConfigService { }

@Injectable()
class MockCommonDialogsService { }

describe('BadgeClassCreateComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BadgeClassCreateComponent
      ],
      providers: [
        {provide: SessionService, useClass: MockSessionService},
        {provide: Router, useClass: MockRouter},
        ActivatedRoute,
        FormBuilder,
        Title,
        {provide: MessageService, useClass: MockMessageService},
        {provide: IssuerManager, useClass: MockIssuerManager},
        {provide: AppConfigService, useClass: MockAppConfigService},
        {provide: CommonDialogsService, useClass: MockCommonDialogsService},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(BadgeClassCreateComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    // const result = component.ngOnInit();
  });

  it('should run #badgeClassCreated()', async () => {
    // const result = component.badgeClassCreated(promise);
  });

  it('should run #creationCanceled()', async () => {
    // const result = component.creationCanceled();
  });

});
