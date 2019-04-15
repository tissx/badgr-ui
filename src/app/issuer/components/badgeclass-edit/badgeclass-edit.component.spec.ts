// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {BadgeClassEditComponent} from './badgeclass-edit.component';
import {SessionService} from '../../../common/services/session.service';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {MessageService} from '../../../common/services/message.service';
import {EventsService} from '../../../common/services/events.service';
import {BadgeClassManager, BadgeClassManager} from '../../services/badgeclass-manager.service';
import {IssuerManager} from '../../services/issuer-manager.service';
import {BadgeInstanceManager} from '../../services/badgeinstance-manager.service';
import {AppConfigService} from '../../../common/app-config.service';

@Injectable()
class MockSessionService { }

@Injectable();
class MockRouter { navigate = jest.fn(); }

@Injectable()
class MockMessageService { }

@Injectable()
class MockEventsService { }

@Injectable()
class MockBadgeClassManager { }

@Injectable()
class MockIssuerManager { }

@Injectable()
class MockBadgeInstanceManager { }

@Injectable()
class MockAppConfigService { }

describe('BadgeClassEditComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BadgeClassEditComponent
      ],
      providers: [
        {provide: SessionService, useClass: MockSessionService},
        {provide: Router, useClass: MockRouter},
        ActivatedRoute,
        FormBuilder,
        Title,
        {provide: MessageService, useClass: MockMessageService},
        {provide: EventsService, useClass: MockEventsService},
        {provide: BadgeClassManager, useClass: MockBadgeClassManager},
        {provide: IssuerManager, useClass: MockIssuerManager},
        {provide: BadgeInstanceManager, useClass: MockBadgeInstanceManager},
        {provide: AppConfigService, useClass: MockAppConfigService},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(BadgeClassEditComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #badgeClassSaved()', async () => {
    // const result = component.badgeClassSaved(promise);
  });

  it('should run #editingCanceled()', async () => {
    // const result = component.editingCanceled();
  });

});
