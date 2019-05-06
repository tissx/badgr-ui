// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {BadgeClassDetailComponent} from './badgeclass-detail.component';
import {Title} from '@angular/platform-browser';
import {MessageService} from '../../../common/services/message.service';
import {BadgeClassManager} from '../../services/badgeclass-manager.service';
import {IssuerManager} from '../../services/issuer-manager.service';
import {BadgeInstanceManager} from '../../services/badgeinstance-manager.service';
import {SessionService} from '../../../common/services/session.service';
import {Router, ActivatedRoute} from '@angular/router';
import {CommonDialogsService} from '../../../common/services/common-dialogs.service';
import {EventsService} from '../../../common/services/events.service';
import {AppConfigService} from '../../../common/app-config.service';
import {ExternalToolsManager} from '../../../externaltools/services/externaltools-manager.service';

@Injectable()
class MockMessageService { }

@Injectable()
class MockBadgeClassManager { }

@Injectable()
class MockIssuerManager { }

@Injectable()
class MockBadgeInstanceManager { }

@Injectable()
class MockSessionService { }

@Injectable()
class MockRouter { navigate = jest.fn(); }

@Injectable()
class MockCommonDialogsService { }

@Injectable()
class MockEventsService { }

@Injectable()
class MockAppConfigService { }

@Injectable()
class MockExternalToolsManager { }

describe('BadgeClassDetailComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BadgeClassDetailComponent
      ],
      providers: [
        Title,
        {provide: MessageService, useClass: MockMessageService},
        {provide: BadgeClassManager, useClass: MockBadgeClassManager},
        {provide: IssuerManager, useClass: MockIssuerManager},
        {provide: BadgeInstanceManager, useClass: MockBadgeInstanceManager},
        {provide: SessionService, useClass: MockSessionService},
        {provide: Router, useClass: MockRouter},
        ActivatedRoute,
        {provide: CommonDialogsService, useClass: MockCommonDialogsService},
        {provide: EventsService, useClass: MockEventsService},
        {provide: AppConfigService, useClass: MockAppConfigService},
        {provide: ExternalToolsManager, useClass: MockExternalToolsManager},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(BadgeClassDetailComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #loadInstances()', async () => {
    // const result = component.loadInstances(recipientQuery);
  });

  it('should run #ngOnInit()', async () => {
    // const result = component.ngOnInit();
  });

  it('should run #revokeInstance()', async () => {
    // const result = component.revokeInstance(instance);
  });

  it('should run #deleteBadge()', async () => {
    // const result = component.deleteBadge();
  });

  it('should run #shareInstance()', async () => {
    // const result = component.shareInstance(instance);
  });

  it('should run #badgeShareDialogOptionsFor()', async () => {
    // const result = component.badgeShareDialogOptionsFor(badge);
  });

  it('should run #updateResults()', async () => {
    // const result = component.updateResults();
  });

  it('should run #hasNextPage()', async () => {
    // const result = component.hasNextPage();
  });

  it('should run #hasPrevPage()', async () => {
    // const result = component.hasPrevPage();
  });

  it('should run #clickNextPage()', async () => {
    // const result = component.clickNextPage();
  });

  it('should run #clickPrevPage()', async () => {
    // const result = component.clickPrevPage();
  });

  it('should run #clickLaunchpoint()', async () => {
    // const result = component.clickLaunchpoint(launchpoint, instanceSlug);
  });

});
