// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {RecipientBadgeCollectionDetailComponent} from './recipient-badge-collection-detail.component';
import {Router, ActivatedRoute} from '@angular/router';
import {SessionService} from '../../../common/services/session.service';
import {Title} from '@angular/platform-browser';
import {MessageService} from '../../../common/services/message.service';
import {RecipientBadgeManager} from '../../services/recipient-badge-manager.service';
import {RecipientBadgeCollectionManager} from '../../services/recipient-badge-collection-manager.service';
import {AppConfigService} from '../../../common/app-config.service';
import {CommonDialogsService} from '../../../common/services/common-dialogs.service';

@Injectable()
class MockRouter { navigate = jest.fn(); }

@Injectable()
class MockSessionService { }

@Injectable()
class MockMessageService { }

@Injectable()
class MockRecipientBadgeManager { }

@Injectable()
class MockRecipientBadgeCollectionManager { }

@Injectable()
class MockAppConfigService { }

@Injectable()
class MockCommonDialogsService { }

describe('RecipientBadgeCollectionDetailComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecipientBadgeCollectionDetailComponent
      ],
      providers: [
        {provide: Router, useClass: MockRouter},
        ActivatedRoute,
        {provide: SessionService, useClass: MockSessionService},
        Title,
        {provide: MessageService, useClass: MockMessageService},
        {provide: RecipientBadgeManager, useClass: MockRecipientBadgeManager},
        {provide: RecipientBadgeCollectionManager, useClass: MockRecipientBadgeCollectionManager},
        {provide: AppConfigService, useClass: MockAppConfigService},
        {provide: CommonDialogsService, useClass: MockCommonDialogsService},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(RecipientBadgeCollectionDetailComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    // const result = component.ngOnInit();
  });

  it('should run #manageBadges()', async () => {
    // const result = component.manageBadges();
  });

  it('should run #deleteCollection()', async () => {
    // const result = component.deleteCollection();
  });

  it('should run #removeEntry()', async () => {
    // const result = component.removeEntry(entry);
  });

  it('should run #shareCollection()', async () => {
    // const result = component.shareCollection();
  });

});
