// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {OAuthBannerComponent} from './oauth-banner.component';
import {MessageService} from '../services/message.service';
import {OAuthManager} from '../services/oauth-manager.service';

@Injectable()
class MockMessageService { }

@Injectable()
class MockOAuthManager { }

describe('OAuthBannerComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        OAuthBannerComponent
      ],
      providers: [
        {provide: MessageService, useClass: MockMessageService},
        {provide: OAuthManager, useClass: MockOAuthManager},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(OAuthBannerComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

});
