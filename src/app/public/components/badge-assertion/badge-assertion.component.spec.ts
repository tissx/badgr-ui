// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive, Injector} from '@angular/core';
import {PublicBadgeAssertionComponent} from './badge-assertion.component';
import {EmbedService} from '../../../common/services/embed.service';
import {MessageService} from '../../../common/services/message.service';
import {AppConfigService} from '../../../common/app-config.service';
import {QueryParametersService} from '../../../common/services/query-parameters.service';
import {Title} from '@angular/platform-browser';

@Injectable()
class MockEmbedService { }

@Injectable()
class MockMessageService { }

@Injectable()
class MockAppConfigService { }

@Injectable()
class MockQueryParametersService { }

describe('PublicBadgeAssertionComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PublicBadgeAssertionComponent
      ],
      providers: [
        Injector,
        {provide: EmbedService, useClass: MockEmbedService},
        {provide: MessageService, useClass: MockMessageService},
        {provide: AppConfigService, useClass: MockAppConfigService},
        {provide: QueryParametersService, useClass: MockQueryParametersService},
        Title,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(PublicBadgeAssertionComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #generateFileName()', async () => {
    // const result = component.generateFileName(assertion, fileExtension);
  });

  it('should run #openSaveDialog()', async () => {
    // component.openSaveDialog(assertion);
  });

  it('should run #mimeToExtension()', async () => {
    // const result = component.mimeToExtension(mimeType);
  });

});
