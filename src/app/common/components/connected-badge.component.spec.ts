// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {ConnectedBadgeComponent} from './connected-badge.component';
import {BadgeClassManager} from '../../issuer/services/badgeclass-manager.service';
import {MessageService} from '../services/message.service';

@Injectable()
class MockBadgeClassManager { }

@Injectable()
class MockMessageService { }

describe('ConnectedBadgeComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ConnectedBadgeComponent
      ],
      providers: [
        {provide: BadgeClassManager, useClass: MockBadgeClassManager},
        {provide: MessageService, useClass: MockMessageService},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(ConnectedBadgeComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #removeConnection()', async () => {
    // const result = component.removeConnection();
  });

});
