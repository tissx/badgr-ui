// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive, ElementRef, Renderer2} from '@angular/core';
import {AddBadgeDialogComponent} from './add-badge-dialog.component';
import {RecipientBadgeManager} from '../../services/recipient-badge-manager.service';
import {FormBuilder} from '@angular/forms';
import {MessageService} from '../../../common/services/message.service';

@Injectable()
class MockElementRef {
  // constructor() { super(undefined); }
  nativeElement = {}
}
@Injectable()
class MockRecipientBadgeManager { }

@Injectable()
class MockMessageService { }

describe('AddBadgeDialogComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddBadgeDialogComponent
      ],
      providers: [
        {provide: ElementRef, useClass: MockElementRef},
        Renderer2,
        {provide: RecipientBadgeManager, useClass: MockRecipientBadgeManager},
        FormBuilder,
        {provide: MessageService, useClass: MockMessageService},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(AddBadgeDialogComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #openDialog()', async () => {
    // const result = component.openDialog(customOptions);
  });

  it('should run #closeDialog()', async () => {
    // const result = component.closeDialog();
  });

  it('should run #submitBadgeRecipientForm()', async () => {
    // const result = component.submitBadgeRecipientForm();
  });

  it('should run #controlUpdated()', async () => {
    // const result = component.controlUpdated(updatedControl);
  });

  it('should run #clearFormError()', async () => {
    // const result = component.clearFormError();
  });

});
