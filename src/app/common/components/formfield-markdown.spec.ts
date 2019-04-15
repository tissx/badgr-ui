// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {FormFieldMarkdown} from './formfield-markdown';
import {CommonDialogsService} from '../services/common-dialogs.service';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable()
class MockCommonDialogsService { }

describe('FormFieldMarkdown', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormFieldMarkdown
      ],
      providers: [
        {provide: CommonDialogsService, useClass: MockCommonDialogsService},
        DomSanitizer,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(FormFieldMarkdown);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngAfterViewInit()', async () => {
    // const result = component.ngAfterViewInit();
  });

  it('should run #ngOnChanges()', async () => {
    // const result = component.ngOnChanges(changes);
  });

  it('should run #markdownPreview()', async () => {
    // const result = component.markdownPreview(preview);
  });

  it('should run #updateDisabled()', async () => {
    // const result = component.updateDisabled();
  });

  it('should run #openMarkdownHintsDialog()', async () => {
    // const result = component.openMarkdownHintsDialog();
  });

  it('should run #unlock()', async () => {
    // const result = component.unlock();
  });

  it('should run #focus()', async () => {
    // const result = component.focus();
  });

  it('should run #select()', async () => {
    // const result = component.select();
  });

  it('should run #cacheControlState()', async () => {
    // const result = component.cacheControlState();
  });

  it('should run #postProcessInput()', async () => {
    // const result = component.postProcessInput();
  });

  it('should run #handleKeyPress()', async () => {
    // const result = component.handleKeyPress(event);
  });

});
