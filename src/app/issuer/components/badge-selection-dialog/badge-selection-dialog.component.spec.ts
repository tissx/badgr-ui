// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive, ElementRef, Renderer2} from '@angular/core';
import {BadgeSelectionDialog} from './badge-selection-dialog.component';
import {BadgeClassManager} from '../../services/badgeclass-manager.service';
import {IssuerManager} from '../../services/issuer-manager.service';
import {MessageService} from '../../../common/services/message.service';
import {SettingsService} from '../../../common/services/settings.service';

@Injectable()
class MockElementRef {
  // constructor() { super(undefined); }
  nativeElement = {}
}
@Injectable()
class MockBadgeClassManager { }

@Injectable()
class MockIssuerManager { }

@Injectable()
class MockMessageService { }

@Injectable()
class MockSettingsService { }

describe('BadgeSelectionDialog', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BadgeSelectionDialog
      ],
      providers: [
        {provide: ElementRef, useClass: MockElementRef},
        Renderer2,
        {provide: BadgeClassManager, useClass: MockBadgeClassManager},
        {provide: IssuerManager, useClass: MockIssuerManager},
        {provide: MessageService, useClass: MockMessageService},
        {provide: SettingsService, useClass: MockSettingsService},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(BadgeSelectionDialog);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #openDialog()', async () => {
    // const result = component.openDialog({ dialogId, dialogTitle, multiSelectMode, restrictToIssuerId, selectedBadges, omittedBadges });
  });

  it('should run #cancelDialog()', async () => {
    // const result = component.cancelDialog();
  });

  it('should run #saveDialog()', async () => {
    // const result = component.saveDialog();
  });

  it('should run #updateBadgeSelection()', async () => {
    // const result = component.updateBadgeSelection(badgeClass, select);
  });

  it('should run #applySorting()', async () => {
    // const result = component.applySorting();
  });

  it('should run #loadSettings()', async () => {
    // const result = component.loadSettings();
  });

  it('should run #saveSettings()', async () => {
    // const result = component.saveSettings();
  });

  it('should run #updateData()', async () => {
    // const result = component.updateData();
  });

  it('should run #updateBadges()', async () => {
    // const result = component.updateBadges(badgesByIssuerUrl, allBadges, issuers);
  });

  it('should run #updateResults()', async () => {
    // const result = component.updateResults();
  });

});
