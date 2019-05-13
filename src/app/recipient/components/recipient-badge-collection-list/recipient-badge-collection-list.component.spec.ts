// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {RecipientBadgeCollectionListComponent} from './recipient-badge-collection-list.component';
import {Router, ActivatedRoute} from '@angular/router';
import {SessionService} from '../../../common/services/session.service';
import {FormBuilder} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {MessageService} from '../../../common/services/message.service';
import {RecipientBadgeCollectionManager} from '../../services/recipient-badge-collection-manager.service';
import {RecipientBadgeManager} from '../../services/recipient-badge-manager.service';
import {AppConfigService} from '../../../common/app-config.service';
import {CommonDialogsService} from '../../../common/services/common-dialogs.service';

@Injectable()
class MockRouter { /*navigate = jest.fn();*/ }

@Injectable()
class MockSessionService { }

@Injectable()
class MockMessageService { }

@Injectable()
class MockRecipientBadgeCollectionManager { }

@Injectable()
class MockRecipientBadgeManager { }

@Injectable()
class MockAppConfigService { }

@Injectable()
class MockCommonDialogsService { }

describe('RecipientBadgeCollectionListComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecipientBadgeCollectionListComponent
      ],
      providers: [
        {provide: Router, useClass: MockRouter},
        ActivatedRoute,
        {provide: SessionService, useClass: MockSessionService},
        FormBuilder,
        Title,
        {provide: MessageService, useClass: MockMessageService},
        {provide: RecipientBadgeCollectionManager, useClass: MockRecipientBadgeCollectionManager},
        {provide: RecipientBadgeManager, useClass: MockRecipientBadgeManager},
        {provide: AppConfigService, useClass: MockAppConfigService},
        {provide: CommonDialogsService, useClass: MockCommonDialogsService},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(RecipientBadgeCollectionListComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #togglePublishCollection()', async () => {
    // const result = component.togglePublishCollection(collection);
  });

  it('should run #shareCollection()', async () => {
    // const result = component.shareCollection(collection);
  });

  it('should run #ngOnInit()', async () => {
    // const result = component.ngOnInit();
  });

});
