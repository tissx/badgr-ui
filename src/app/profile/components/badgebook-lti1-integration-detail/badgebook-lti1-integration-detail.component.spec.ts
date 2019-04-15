// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {BadgebookLti1DetailComponent} from './badgebook-lti1-integration-detail.component';
import {SessionService} from '../../../common/services/session.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {MessageService} from '../../../common/services/message.service';
import {AppIntegrationManager} from '../../services/app-integration-manager.service';
import {AppConfigService} from '../../../common/app-config.service';

@Injectable()
class MockSessionService { }

@Injectable();
class MockRouter { navigate = jest.fn(); }

@Injectable()
class MockMessageService { }

@Injectable()
class MockAppIntegrationManager { }

@Injectable()
class MockAppConfigService { }

describe('BadgebookLti1DetailComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BadgebookLti1DetailComponent
      ],
      providers: [
        {provide: SessionService, useClass: MockSessionService},
        ActivatedRoute,
        {provide: Router, useClass: MockRouter},
        Title,
        {provide: MessageService, useClass: MockMessageService},
        {provide: AppIntegrationManager, useClass: MockAppIntegrationManager},
        {provide: AppConfigService, useClass: MockAppConfigService},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(BadgebookLti1DetailComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

});
