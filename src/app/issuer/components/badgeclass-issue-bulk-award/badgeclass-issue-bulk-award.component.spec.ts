// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {BadgeClassIssueBulkAwardComponent} from './badgeclass-issue-bulk-award.component';
import {BadgeClassManager} from '../../services/badgeclass-manager.service';
import {FormBuilder} from '@angular/forms';
import {IssuerManager} from '../../services/issuer-manager.service';
import {SessionService} from '../../../common/services/session.service';
import {MessageService} from '../../../common/services/message.service';
import {Router, ActivatedRoute} from '@angular/router';
import {AppConfigService} from '../../../common/app-config.service';
import {Title} from '@angular/platform-browser';

@Injectable()
class MockBadgeClassManager { }

@Injectable()
class MockIssuerManager { }

@Injectable()
class MockSessionService { }

@Injectable()
class MockMessageService { }

@Injectable()
class MockRouter { navigate = jest.fn(); }

@Injectable()
class MockAppConfigService { }

describe('BadgeClassIssueBulkAwardComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BadgeClassIssueBulkAwardComponent
      ],
      providers: [
        {provide: BadgeClassManager, useClass: MockBadgeClassManager},
        FormBuilder,
        {provide: IssuerManager, useClass: MockIssuerManager},
        {provide: SessionService, useClass: MockSessionService},
        {provide: MessageService, useClass: MockMessageService},
        {provide: Router, useClass: MockRouter},
        ActivatedRoute,
        {provide: AppConfigService, useClass: MockAppConfigService},
        Title,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(BadgeClassIssueBulkAwardComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #onBulkIssueImportPreviewData()', async () => {
    // const result = component.onBulkIssueImportPreviewData(importPreviewData);
  });

  it('should run #onTransformedImportData()', async () => {
    // const result = component.onTransformedImportData(transformedImportData);
  });

  it('should run #updateViewState()', async () => {
    // const result = component.updateViewState(state);
  });

  it('should run #navigateToIssueBadgeInstance()', async () => {
    // const result = component.navigateToIssueBadgeInstance();
  });

  it('should run #createRange()', async () => {
    // const result = component.createRange(size);
  });

});
