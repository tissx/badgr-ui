import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {LoginComponent} from './login.component';
import {FormBuilder} from '@angular/forms';
import {Title, DomSanitizer} from '@angular/platform-browser';
import {
	COMMON_MOCKS_PROVIDERS_WITH_SUBS,
} from "../../../mocks/mocks.module";
import { CommonModule } from "@angular/common";
import { BadgrCommonModule, COMMON_IMPORTS } from "../../../common/badgr-common.module";
import { CommonEntityManagerModule } from "../../../entity-manager/entity-manager.module";
import { RouterTestingModule } from "@angular/router/testing";



describe('LoginComponent', () => {
  let fixture;
  let component;

	beforeEach(() => {
    TestBed.configureTestingModule({
			imports: [
				...COMMON_IMPORTS,
				BadgrCommonModule,
				CommonEntityManagerModule,
				RouterTestingModule,
			],
			declarations: [
        LoginComponent
      ],
      providers: [
        FormBuilder,
        Title,
				...COMMON_MOCKS_PROVIDERS_WITH_SUBS,

			],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #sanitize()', async () => {
    const result = component.sanitize('www.badger.com');
  });

  it('should run #ngOnInit()', async () => {
    const result = component.ngOnInit();
  });

  it('should run #ngAfterViewInit()', async () => {
    component.ngAfterViewInit();
  });

  it('should run #submitAuth()', async () => {
    const result = component.submitAuth();
  });

  it('should run #handleQueryParamCases()', async () => {
    const result = component.handleQueryParamCases();
  });

  it('should run #initVerifiedData()', async () => {
    const result = component.initVerifiedData();
  });

});
