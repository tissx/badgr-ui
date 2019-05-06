// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {BadgeClassIssueComponent} from './badgeclass-issue.component';
import {Title, MessageService, EventsService, IssuerManager, BadgeClassManager, BadgeInstanceManager, CommonDialogsService, SessionService, Router, ActivatedRoute} from 'striptags';
import {AppConfigService} from '../../../common/app-config.service';

@Injectable()
class MockAppConfigService { }

@Injectable()
class MockRouter { navigate = jest.fn(); }

describe('BadgeClassIssueComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BadgeClassIssueComponent
      ],
      providers: [
        Title,
        MessageService,
        EventsService,
        IssuerManager,
        BadgeClassManager,
        BadgeInstanceManager,
        CommonDialogsService,
        {provide: AppConfigService, useClass: MockAppConfigService},
        SessionService,
        {provide: Router, useClass: MockRouter},
        ActivatedRoute,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(BadgeClassIssueComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    // const result = component.ngOnInit();
  });

  it('should run #enableEvidence()', async () => {
    // const result = component.enableEvidence();
  });

  it('should run #toggleExpiration()', async () => {
    // const result = component.toggleExpiration();
  });

  it('should run #addEvidence()', async () => {
    // const result = component.addEvidence();
  });

  it('should run #onSubmit()', async () => {
    // const result = component.onSubmit();
  });

  it('should run #removeEvidence()', async () => {
    // const result = component.removeEvidence(i);
  });

});
