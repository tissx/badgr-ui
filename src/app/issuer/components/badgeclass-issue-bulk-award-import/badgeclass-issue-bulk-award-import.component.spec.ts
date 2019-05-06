// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {BadgeClassIssueBulkAwardImportComponent} from './badgeclass-issue-bulk-award-import.component';
import {FormBuilder} from '@angular/forms';
import {SessionService} from '../../../common/services/session.service';
import {MessageService} from '../../../common/services/message.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Injectable()
class MockSessionService { }

@Injectable()
class MockMessageService { }

@Injectable()
class MockRouter { navigate = jest.fn(); }

describe('BadgeClassIssueBulkAwardImportComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BadgeClassIssueBulkAwardImportComponent
      ],
      providers: [
        FormBuilder,
        {provide: SessionService, useClass: MockSessionService},
        {provide: MessageService, useClass: MockMessageService},
        {provide: Router, useClass: MockRouter},
        ActivatedRoute,
        Title,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(BadgeClassIssueBulkAwardImportComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #importAction()', async () => {
    // const result = component.importAction();
  });

  it('should run #importPreviewDataEmit()', async () => {
    // const result = component.importPreviewDataEmit();
  });

  it('should run #updateViewState()', async () => {
    // const result = component.updateViewState(state);
  });

  it('should run #onFileDataRecived()', async () => {
    // const result = component.onFileDataRecived(data);
  });

  it('should run #parseCsv()', async () => {
    // const result = component.parseCsv(rawCSV);
  });

  it('should run #createRange()', async () => {
    // const result = component.createRange(size);
  });

});
