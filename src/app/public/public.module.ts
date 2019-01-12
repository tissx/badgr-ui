import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BadgrCommonModule, COMMON_IMPORTS} from '../common/badgr-common.module';

import {PublicComponent} from './public.component';
import {CommonEntityManagerModule} from '../entity-manager/entity-manager.module';
import {PublicBadgeAssertionComponent} from './badge-assertion.component';
import {PublicApiService} from './services/public-api.service';
import {PublicBadgeClassComponent} from './badgeclass.component';
import {PublicIssuerComponent} from './issuer.component';
import {PublicBadgeCollectionComponent} from './badge-collection.component';
import {BadgrRouteData} from '../common/services/navigation.service';

export const routes: Routes = [
	{
		path: '',
		component: PublicComponent,
		data: {
			publiclyAccessible: true,
		} as BadgrRouteData
	},

	{
		path: 'assertions/:assertionId',
		component: PublicBadgeAssertionComponent,
		data: {
			publiclyAccessible: true,
		} as BadgrRouteData
	},

	{
		path: 'badges/:badgeId',
		component: PublicBadgeClassComponent,
		data: {
			publiclyAccessible: true,
		} as BadgrRouteData
	},

	{
		path: 'issuers/:issuerId',
		component: PublicIssuerComponent,
		data: {
			publiclyAccessible: true,
		} as BadgrRouteData
	},

	{
		path: 'collections/:collectionShareHash',
		component: PublicBadgeCollectionComponent,
		data: {
			publiclyAccessible: true,
		} as BadgrRouteData
	},

	{
		path: '**',
		component: PublicComponent,
		data: {
			publiclyAccessible: true,
		} as BadgrRouteData
	},
];

@NgModule({
	imports: [
		...COMMON_IMPORTS,
		BadgrCommonModule,
		CommonEntityManagerModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		PublicComponent,
		PublicBadgeAssertionComponent,
		PublicBadgeClassComponent,
		PublicIssuerComponent,
		PublicBadgeCollectionComponent
	],
	exports: [],
	providers: [
		PublicApiService
	]
})
export class PublicModule {
}
