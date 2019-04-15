// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive, Injector} from '@angular/core';
import {PublicBadgeClassComponent} from './badgeclass.component';
import {EmbedService} from '../../../common/services/embed.service';
import {AppConfigService} from '../../../common/app-config.service';
import {Title} from '@angular/platform-browser';

@Injectable()
class MockEmbedService { }

@Injectable()
class MockAppConfigService { }

describe('PublicBadgeClassComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PublicBadgeClassComponent
      ],
      providers: [
        Injector,
        {provide: EmbedService, useClass: MockEmbedService},
        {provide: AppConfigService, useClass: MockAppConfigService},
        Title,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(PublicBadgeClassComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

});
