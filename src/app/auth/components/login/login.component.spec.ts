// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, Type } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {LoginComponent} from './login.component';
import {FormBuilder} from '@angular/forms';
import {Title, DomSanitizer} from '@angular/platform-browser';
import {SessionService} from '../../../common/services/session.service';
import {MessageService} from '../../../common/services/message.service';
import {AppConfigService} from '../../../common/app-config.service';
import {QueryParametersService} from '../../../common/services/query-parameters.service';
import {OAuthManager} from '../../../common/services/oauth-manager.service';
import {ExternalToolsManager} from '../../../externaltools/services/externaltools-manager.service';
import {UserProfileManager} from '../../../common/services/user-profile-manager.service';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import { BadgrCommonModule, COMMON_IMPORTS } from "../../../common/badgr-common.module";
import { EventsService } from "../../../common/services/events.service";
import { Subject } from "rxjs";
import { ApiExternalToolLaunchInfo } from "../../../externaltools/models/externaltools-api.model";


@Injectable()
class MockSessionService {
	subscribe = (fn: (value: Data) => void) => fn({});
}

@Injectable()
class MockMessageService {
	subscribe = (fn: (value: Data) => void) => fn({});
	unsubscribe = (fn: (value: Data) => void) => fn({});
	dismissMessage = () => {};
	getMessage = () => {};
	message$ = {
		subscribe : (fn: (value: Data) => void) => fn({}),
		unsubscribe : (fn: (value: Data) => void) => fn({}),
	};
}

@Injectable()
class MockAppConfigService {
	theme = () => "Badgr"

}

@Injectable()
class MockQueryParametersService {
	clearInitialQueryParams = () => null;
	queryStringValue = () => null;
}

@Injectable()
class MockOAuthManager { }

@Injectable()
class MockExternalToolsManager { }

@Injectable()
class MockUserProfileManager { }

@Injectable()
class MockRouter { navigate = () => {jasmine.createSpy('navigate') }}

@Injectable()
class MockEventsService {
	subscribe = (fn: (value: Data) => void) => fn({});
	profileEmailsChanged = {subscribe : (fn: (value: Data) => void) => fn({})};
	recipientBadgesStale = {subscribe : (fn: (value: Data) => void) => fn({})};
	documentClicked = {subscribe : (fn: (value: Data) => void) => fn({})};
	externalToolLaunch = {subscribe : (fn: (value: Data) => void) => fn({})};
}

// @Injectable()
// class MockRoute {
// 	snapshot: {
// 		data: {},
// 	};
// 	url: ''
// }
// export class ActivatedRouteMock {
// 	public paramMap = of(convertToParamMap({
// 		testId: 'abc123',
// 		anotherId: 'd31e8b48-7309-4c83-9884-4142efdf7271',
// 	}));
// }

describe('LoginComponent', () => {
  let fixture;
  let component;
	const fakeActivatedRoute = {
		data: {
			subscribe: (fn: (value: Data) => void) => fn({
				company: 'COMPANY',
			}),
		},
		params: {
			subscribe: (fn: (value: Params) => void) => fn({
				tab: 0,
			}),
		},
		snapshot: {
			data: {},
			//params: Observable.of({id: "5"}),
		},
		url: null,
		queryParams: {
			//clearInitialQueryParams: () => null,
			subscribe: (fn: (value: Params) => void) => fn({
				clearInitialQueryParams: () => null,
			}),
		},
		fragment: null,
		outlet: null,
		component: null,

	} as ActivatedRoute;

	beforeEach(() => {
    TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				BadgrCommonModule,
				...COMMON_IMPORTS,
			],
			declarations: [
        LoginComponent
      ],
      providers: [
        FormBuilder,
        Title,
        {provide: SessionService, useClass: MockSessionService},
        {provide: MessageService, useClass: MockMessageService},
        {provide: AppConfigService, useClass: MockAppConfigService},
        {provide: QueryParametersService, useClass: MockQueryParametersService},
        {provide: OAuthManager, useClass: MockOAuthManager},
        {provide: ExternalToolsManager, useClass: MockExternalToolsManager},
        {provide: UserProfileManager, useClass: MockUserProfileManager},
        DomSanitizer,
        {provide: Router, useClass: MockRouter},
				{provide: ActivatedRoute, useValue: fakeActivatedRoute},
				//{provide: ActivatedRoute, useClass: ActivatedRouteMock},
				{provide: EventsService, useValue: MockEventsService},

			],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.debugElement.componentInstance;
  });

  fit('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  /*xit('should run #sanitize()', async () => {
    const result = component.sanitize('www.badger.com');
  });

  xit('should run #ngOnInit()', async () => {
    const result = component.ngOnInit();
  });

  xit('should run #ngAfterViewInit()', async () => {
    component.ngAfterViewInit();
  });

  xit('should run #submitAuth()', async () => {
    const result = component.submitAuth();
  });

  xit('should run #handleQueryParamCases()', async () => {
    const result = component.handleQueryParamCases();
  });

  xit('should run #initVerifiedData()', async () => {
    const result = component.initVerifiedData();
  });*/

});
