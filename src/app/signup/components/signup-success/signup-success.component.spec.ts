// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {SignupSuccessComponent} from './signup-success.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {SessionService} from '../../../common/services/session.service';
import {AppConfigService} from '../../../common/app-config.service';

@Injectable()
class MockSessionService { }

@Injectable()
class MockAppConfigService { }

@Injectable()
class MockRouter { navigate = jest.fn(); }

describe('SignupSuccessComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SignupSuccessComponent
      ],
      providers: [
        ActivatedRoute,
        Title,
        {provide: SessionService, useClass: MockSessionService},
        {provide: AppConfigService, useClass: MockAppConfigService},
        {provide: Router, useClass: MockRouter},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(SignupSuccessComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    // const result = component.ngOnInit();
  });

});
