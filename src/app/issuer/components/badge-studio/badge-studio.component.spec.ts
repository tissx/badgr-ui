// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {BadgeStudioComponent} from './badge-studio.component';
import {HttpClient} from '@angular/common/http';

describe('BadgeStudioComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BadgeStudioComponent
      ],
      providers: [
        HttpClient,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(BadgeStudioComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    // const result = component.ngOnInit();
  });

  it('should run #generateRandom()', async () => {
    // const result = component.generateRandom();
  });

  it('should run #renderIcon()', async () => {
    // const result = component.renderIcon(iconCanvas, iconChar, iconColor, fontSize, offset);
  });

});
