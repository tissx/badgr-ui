import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {BaseHttpApiService} from "../../common/services/base-http-api.service";
import {SessionService} from "../../common/services/session.service";
import {AppConfigService} from "../../common/app-config.service";
import {
	ApiIssuerRecipientGroupDetailList,
	ApiIssuerRecipientGroupList,
	ApiRecipientGroup,
	ApiRecipientGroupForCreation
} from "../models/recipientgroup-api.model";
import {MessageService} from "../../common/services/message.service";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class RecipientGroupApiService extends BaseHttpApiService {
	constructor(
		protected loginService: SessionService,
		protected http: HttpClient,
		protected configService: AppConfigService,
		protected messageService: MessageService
	) {
		super(loginService, http, configService, messageService);
	}

	listIssuerRecipientGroups(
		issuerSlug: string
	) {
		return this
			.get<ApiIssuerRecipientGroupList>(`/v2/issuers/${issuerSlug}/recipient-groups`)
			.then(r => r.body);
	}

	listIssuerRecipientGroupDetail(
		issuerSlug: string
	) {
		return this
			.get<ApiIssuerRecipientGroupDetailList>(`/v2/issuers/${issuerSlug}/recipient-groups?embedRecipients=true`)
			.then(r => r.body);
	}

	/**
	 * Define a new recipientGroup to be owned by an issuer
	 */
	createRecipientGroup(
		issuerSlug: string,
		recipientGroupPayload: ApiRecipientGroupForCreation
	) {
		return this
			.post<ApiRecipientGroup>(`/v2/issuers/${issuerSlug}/recipient-groups`, recipientGroupPayload)
			.then(r => r.body);
	}

	/**
	 * GET detail on a recipientGroup
	 */
	getRecipientGroupDetail(
		issuerSlug: string,
		recipientGroupSlug: string
	) {
		return this
			.get<ApiRecipientGroup>(`/v2/issuers/${issuerSlug}/recipient-groups/${recipientGroupSlug}?embedRecipients=true`)
			.then(r => r.body);
	}

	/**
	 * PUT (update) detail on a recipientGroup
	 */
	putRecipientGroup(
		issuerSlug: string,
		recipientGroupSlug: string,
		recipientGroup: ApiRecipientGroup
	) {
		return this
			.put<ApiRecipientGroup>(`/v2/issuers/${issuerSlug}/recipient-groups/${recipientGroupSlug}?embedRecipients=true`, recipientGroup)
			.then(r => r.body);
	}

	/**
	 * DELETE a recipientGroup
	 */
	deleteRecipientGroup(
		issuerSlug: string,
		recipientGroupSlug: string
	) {
		return this
			.delete<Response>(`/v2/issuers/${issuerSlug}/recipient-groups/${recipientGroupSlug}`);
	}

	/**
	 * GET detail on a recipientGroup
	 */
	updateRecipientGroup(
		issuerSlug: string,
		recipientGroupSlug: string,
		recipientGroupPayload: ApiRecipientGroup
	) {
		return this
			.put<ApiRecipientGroup>(`/v2/issuers/${issuerSlug}/recipient-groups/${recipientGroupSlug}`, recipientGroupPayload)
			.then(r => r.body);
	}
}