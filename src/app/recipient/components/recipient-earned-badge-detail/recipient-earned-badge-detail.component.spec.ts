// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {RecipientEarnedBadgeDetailComponent} from './recipient-earned-badge-detail.component';
import {Router, ActivatedRoute} from '@angular/router';
import {SessionService} from '../../../common/services/session.service';
import {RecipientBadgeManager} from '../../services/recipient-badge-manager.service';
import {Title} from '@angular/platform-browser';
import {MessageService} from '../../../common/services/message.service';
import {EventsService} from '../../../common/services/events.service';
import {CommonDialogsService} from '../../../common/services/common-dialogs.service';
import {AppConfigService} from '../../../common/app-config.service';
import {ExternalToolsManager} from '../../../externaltools/services/externaltools-manager.service';
import {QueryParametersService} from '../../../common/services/query-parameters.service';

@Injectable()
class MockRouter { navigate = jest.fn(); }

@Injectable()
class MockSessionService { }

@Injectable()
class MockRecipientBadgeManager { }

@Injectable()
class MockMessageService { }

@Injectable()
class MockEventsService { }

@Injectable()
class MockCommonDialogsService { }

@Injectable()
class MockAppConfigService { }

@Injectable()
class MockExternalToolsManager { }

@Injectable()
class MockQueryParametersService { }

describe('RecipientEarnedBadgeDetailComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecipientEarnedBadgeDetailComponent
      ],
      providers: [
        {provide: Router, useClass: MockRouter},
        ActivatedRoute,
        {provide: SessionService, useClass: MockSessionService},
        {provide: RecipientBadgeManager, useClass: MockRecipientBadgeManager},
        Title,
        {provide: MessageService, useClass: MockMessageService},
        {provide: EventsService, useClass: MockEventsService},
        {provide: CommonDialogsService, useClass: MockCommonDialogsService},
        {provide: AppConfigService, useClass: MockAppConfigService},
        {provide: ExternalToolsManager, useClass: MockExternalToolsManager},
        {provide: QueryParametersService, useClass: MockQueryParametersService},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(RecipientEarnedBadgeDetailComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    // const result = component.ngOnInit();
  });

  it('should run #shareBadge()', async () => {
    // const result = component.shareBadge();
  });

  it('should run #deleteBadge()', async () => {
    // const result = component.deleteBadge(badge);
  });

  it('should run #manageCollections()', async () => {
    // const result = component.manageCollections();
  });

  it('should run #removeCollection()', async () => {
    // const result = component.removeCollection(collection);
  });

  it('should run #updateBadge()', async () => {
    // const result = component.updateBadge(results);
  });

  it('should run #updateData()', async () => {
    // const result = component.updateData();
  });

  it('should run #clickLaunchpoint()', async () => {
    // const result = component.clickLaunchpoint(launchpoint);
  });

});
