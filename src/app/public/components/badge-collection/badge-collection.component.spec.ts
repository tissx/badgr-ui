// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive, Injector} from '@angular/core';
import {PublicBadgeCollectionComponent} from './badge-collection.component';
import {EmbedService} from '../../../common/services/embed.service';
import {AppConfigService} from '../../../common/app-config.service';
import {Title} from '@angular/platform-browser';

@Injectable()
class MockEmbedService { }

@Injectable()
class MockAppConfigService { }

describe('PublicBadgeCollectionComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PublicBadgeCollectionComponent
      ],
      providers: [
        Injector,
        {provide: EmbedService, useClass: MockEmbedService},
        {provide: AppConfigService, useClass: MockAppConfigService},
        Title,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(PublicBadgeCollectionComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #getBadgeUrl()', async () => {
    // const result = component.getBadgeUrl(badge);
  });

  it('should run #isExpired()', async () => {
    // const result = component.isExpired(date);
  });

});
