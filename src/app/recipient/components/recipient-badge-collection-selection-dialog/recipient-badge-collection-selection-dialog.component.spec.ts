// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive, ElementRef, Renderer2} from '@angular/core';
import {RecipientBadgeManager} from '../../services/recipient-badge-manager.service';
import {RecipientBadgeCollectionManager} from '../../services/recipient-badge-collection-manager.service';
import {MessageService} from '../../../common/services/message.service';
import {SettingsService} from '../../../common/services/settings.service';
import { RecipientBadgeCollectionSelectionDialogComponent } from "./recipient-badge-collection-selection-dialog.component";

@Injectable()
class MockElementRef {
  // constructor() { super(undefined); }
  nativeElement = {}
}
@Injectable()
class MockRecipientBadgeManager { }

@Injectable()
class MockRecipientBadgeCollectionManager { }

@Injectable()
class MockMessageService { }

@Injectable()
class MockSettingsService { }

describe('RecipientBadgeCollectionSelectionDialogComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecipientBadgeCollectionSelectionDialogComponent
      ],
      providers: [
        {provide: ElementRef, useClass: MockElementRef},
        Renderer2,
        {provide: RecipientBadgeManager, useClass: MockRecipientBadgeManager},
        {provide: RecipientBadgeCollectionManager, useClass: MockRecipientBadgeCollectionManager},
        {provide: MessageService, useClass: MockMessageService},
        {provide: SettingsService, useClass: MockSettingsService},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(RecipientBadgeCollectionSelectionDialogComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #openDialog()', async () => {
    // const result = component.openDialog({ dialogId, dialogTitle, omittedCollection });
  });

  it('should run #cancelDialog()', async () => {
    // const result = component.cancelDialog();
  });

  it('should run #saveDialog()', async () => {
    // const result = component.saveDialog();
  });

  it('should run #updateData()', async () => {
    // const result = component.updateData();
  });

  it('should run #updateCollection()', async () => {
    // const result = component.updateCollection(checkedCollection, checked);
  });

  it('should run #applySorting()', async () => {
    // const result = component.applySorting();
  });

  it('should run #updateResults()', async () => {
    // const result = component.updateResults();
  });

});
