import {Injectable} from "@angular/core";
import {BaseHttpApiService} from "../../common/services/base-http-api.service";
import {SessionService} from "../../common/services/session.service";
import {AppConfigService} from "../../common/app-config.service";
import {
	ApiIssuerPathwayList,
	ApiPathwayDetail,
	ApiPathwayElement,
	ApiPathwayElementForCreation,
	ApiPathwaySummary,
	ApiPathwaySummaryForCreation
} from "../models/pathway-api.model";
import {BadgeClass} from "../models/badgeclass.model";
import {MessageService} from "../../common/services/message.service";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class PathwayApiService extends BaseHttpApiService {
	constructor(
		protected loginService: SessionService,
		protected http: HttpClient,
		protected configService: AppConfigService,
		protected messageService: MessageService
	) {
		super(loginService, http, configService, messageService);
	}

	listIssuerPathways(
		issuerSlug: string
	) {
		return this
			.get<ApiIssuerPathwayList>(`/v2/issuers/${issuerSlug}/pathways`)
			.then(r => r.body);
	}

	/**
	 * Define a new pathway to be owned by an issuer
	 */
	createPathway(
		issuerSlug: string,
		pathwayPayload: ApiPathwaySummaryForCreation
	) {
		return this
			.post<ApiPathwaySummary>(`/v2/issuers/${issuerSlug}/pathways`, pathwayPayload)
			.then(r => r.body);
	}

	/**
	 * Delete a Pathway Element
	 */
	deletePathway(
		issuerSlug: string,
		pathwaySlug: string
	) {
		return this
			.delete<void>(`/v2/issuers/${issuerSlug}/pathways/${pathwaySlug}`)
			.then(() => void 0);
	}

	/**
	 * GET detail on a pathway
	 */
	getPathwayDetail(
		issuerSlug: string,
		pathwaySlug: string
	) {
		return this
			.get<ApiPathwayDetail>(`/v2/issuers/${issuerSlug}/pathways/${pathwaySlug}`)
			.then(r => r.body);
	}

	/**
	 * PUT new pathway properties
	 */
	putPathwaySummary(
		issuerSlug: string,
		pathwaySlug: string,
		pathway: ApiPathwaySummary
	) {
		return this
			.put<ApiPathwaySummary>(`/v2/issuers/${issuerSlug}/pathways/${pathwaySlug}`, pathway)
			.then(r => r.body);
	}

	/**
	 * GET a flat list of Pathway Elements defined on a pathway
	 */
	getPathwayElements(
		issuerSlug: string,
		pathwaySlug: string
	) {
		return this
			.get<ApiPathwayElement[]>(`/v2/issuers/${issuerSlug}/pathways/${pathwaySlug}/elements`)
			.then(r => r.body);
	}

	/**
	 * Add a new Pathway Element
	 */
	createPathwayElement(
		issuerSlug: string,
		pathwaySlug: string,
		elementPayload: ApiPathwayElementForCreation
	) {
		return this
			.post<ApiPathwayElement>(`/v2/issuers/${issuerSlug}/pathways/${pathwaySlug}/elements`, elementPayload)
			.then(r => r.body)
			;
	}

	/**
	 * GET detail on a pathway, starting at a particular Pathway Element
	 */
	getPathwayElement(
		issuerSlug: string,
		pathwaySlug: string,
		elementSlug: string
	) {
		return this
			.get<ApiPathwayElement>(`/v2/issuers/${issuerSlug}/pathways/${pathwaySlug}/elements/${elementSlug}`)
			.then(r => r.body);
	}

	/**
	 * Update a Pathway Element
	 */
	updatePathwayElement(
		issuerSlug: string,
		pathwaySlug: string,
		elementSlug: string,
		elementPayload: ApiPathwayElement
	) {
		return this
			.put<ApiPathwayElement>(
				`/v2/issuers/${issuerSlug}/pathways/${pathwaySlug}/elements/${elementSlug}`,
				elementPayload
			)
			.then(r => r.body);
	}

	/**
	 * Delete a Pathway Element
	 */
	deletePathwayElement(
		issuerSlug: string,
		pathwaySlug: string,
		elementSlug: string
	) {
		return this
			.delete(`/v2/issuers/${issuerSlug}/pathways/${pathwaySlug}/elements/${elementSlug}`);
	}

	/**
	 * GET list of Badge Classes aligned to a Pathway Element
	 */
	getPathwayElementBadgeAssociations(
		issuerSlug: string,
		pathwaySlug: string,
		elementSlug: string
	) {
		return this
			.get<BadgeClass[]>(`/v2/issuers/${issuerSlug}/pathways/${pathwaySlug}/elements/${elementSlug}/badges`)
			.then(r => r.body);
	}

	/**
	 * Add a Badge Class to a Pathway Element
	 */
	addPathwayElementBadgeAssociation(
		issuerSlug: string,
		pathwaySlug: string,
		elementSlug: string,
		badgeClassSlug: string
	) {
		return this
			.post(
				`/v2/issuers/${issuerSlug}/pathways/${pathwaySlug}/elements/${elementSlug}/badges`,
				{ badge: badgeClassSlug }
			);
	}

	/**
	 * Delete a badge association from a pathway element
	 */
	deletePathwayElementBadgeAssociation(
		issuerSlug: string,
		pathwaySlug: string,
		elementSlug: string,
		badgeSlug: string
	) {
		return this
			.delete(`/v2/issuers/${issuerSlug}/pathways/${pathwaySlug}/elements/${elementSlug}/badges/${badgeSlug}`)
	}
}