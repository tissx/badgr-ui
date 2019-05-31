// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
import { RouterTestingModule } from "@angular/router/testing";
import { BadgrCommonModule, COMMON_IMPORTS } from "../../../common/badgr-common.module";
import { COMMON_MOCKS_PROVIDERS_WITH_SUBS } from "../../../mocks/mocks.module.spec";
import { FormsModule } from "@angular/forms";

describe('RecipientBadgeCollectionSelectionDialogComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RecipientBadgeCollectionSelectionDialogComponent
      ],
			imports: [
				RouterTestingModule,
				CommonModule,
				BadgrCommonModule,
				FormsModule,
				...COMMON_IMPORTS,
			],
			providers: [
				...COMMON_MOCKS_PROVIDERS_WITH_SUBS,
			],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(RecipientBadgeCollectionSelectionDialogComponent);
    component = fixture.debugElement.componentInstance;
		component.resolveFunc = () => {}
		//component.recipientBadgeCollectionManager.recipientBadgeApiService = () => new Promise(() => {})
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  xit('should run #openDialog()', async () => {
    // const result = component.openDialog({ dialogId, dialogTitle, omittedCollection });
  });

  it('should run #cancelDialog()', async () => {
    const result = component.cancelDialog();
  });

  it('should run #saveDialog()', async () => {
    const result = component.saveDialog();
  });

  xit('should run #updateData()', async () => {
    const result = component.updateData();
  });

  xit('should run #updateCollection()', async () => {
    // const result = component.updateCollection(checkedCollection, checked);
  });

  it('should run #applySorting()', async () => {
    const result = component.applySorting();
  });

  xit('should run #updateResults()', async () => {
    const result = component.updateResults();
  });

});
