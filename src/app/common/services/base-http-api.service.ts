import { Injectable } from "@angular/core";
// import { LoginService } from "../../auth/auth.service";
import { AuthorizationToken, SessionService } from "./session.service";
import { AppConfigService } from "../app-config.service";
import { MessageService } from "./message.service";
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { timeoutPromise } from "../util/promise-util";
import { Observable } from "rxjs";

export class BadgrApiError extends Error {
	constructor(
		public message: string,
		public response: HttpResponse<any>
	) {
		super(message);
	}
}

@Injectable()
export abstract class BaseHttpApiService {
;
;
;
	baseUrl: string;

	static async addTestingDelay<T>(
		value: T,
		configService: AppConfigService
	): Promise<T> {
		let delayRange = configService.apiConfig.debugDelayRange;

		if (delayRange) {
			let delayMs = Math.floor(delayRange.minMs + (delayRange.maxMs - delayRange.minMs) * Math.random());

			console.warn(`Delaying API response by ${delayMs}ms for debugging`, value);

			await timeoutPromise(delayMs);

			return value;
		} else {
			return value;
		}
	}

	constructor(
		// protected sessionService: LoginService,
		protected sessionService: SessionService,
		protected http: HttpClient,
		protected configService: AppConfigService,
		protected messageService: MessageService
	) {
		this.baseUrl = this.configService.apiConfig.baseUrl;
	}

	get<T = Object>(
		path: string,
		queryParams: HttpParams | { [param: string]: string | string[]; } | null = null,
		requireAuth: boolean = true,
		useAuth: boolean = true,
		headers: HttpHeaders = new HttpHeaders()
	): Promise<HttpResponse<T>> {
		const endpointUrl = path.startsWith("http") ? path : this.baseUrl + path;

		if (useAuth && (requireAuth || this.sessionService.isLoggedIn))
			headers = this.addAuthTokenHeader(headers, this.sessionService.requiredAuthToken);

		headers = this.addJsonResponseHeader(headers);
		this.messageService.incrementPendingRequestCount();

		return this.augmentRequest<T>(
			this.http.get<T>(endpointUrl, {
				observe: 'response',
				headers: headers,
				params: queryParams,
				responseType: 'json'
			})
		);
	}

	post<T = Object>(
		path: string,
		payload: any,
		queryParams: HttpParams | { [param: string]: string | string[]; } | null = null,
		headers: HttpHeaders = new HttpHeaders()
	): Promise<HttpResponse<T>> {
		const endpointUrl = path.startsWith("http") ? path : this.baseUrl + path;

		headers = this.addAuthTokenHeader(headers, this.sessionService.requiredAuthToken);
		headers = this.addJsonRequestHeader(headers);
		headers = this.addJsonResponseHeader(headers);
		this.messageService.incrementPendingRequestCount();

		return this.augmentRequest<T>(
			this.http.post<T>(
				endpointUrl,
				JSON.stringify(payload),
				{
					observe: 'response',
					headers: headers,
					params: queryParams,
					responseType: 'json'
				}
			)
		);
	}

	put<T = Object>(
		path: string,
		payload: any,
		queryParams: HttpParams | { [param: string]: string | string[]; } | null = null,
		headers: HttpHeaders = new HttpHeaders()
	): Promise<HttpResponse<T>> {
		const endpointUrl = path.startsWith("http") ? path : this.baseUrl + path;

		headers = this.addAuthTokenHeader(headers, this.sessionService.requiredAuthToken);
		headers = this.addJsonRequestHeader(headers);
		headers = this.addJsonResponseHeader(headers);
		this.messageService.incrementPendingRequestCount();

		return this.augmentRequest<T>(
			this.http.put<T>(
				endpointUrl,
				JSON.stringify(payload),
				{
					observe: 'response',
					headers: headers,
					params: queryParams,
					responseType: 'json'
				}
			)
		);
	}

	delete<T = Object>(
		path: string,
		payload: any = null,
		queryParams: HttpParams | { [param: string]: string | string[]; } | null = null,
		headers: HttpHeaders = new HttpHeaders()
	): Promise<HttpResponse<T>> {
		const endpointUrl = path.startsWith("http") ? path : this.baseUrl + path;
		headers = this.addAuthTokenHeader(headers, this.sessionService.requiredAuthToken);
		headers = this.addJsonRequestHeader(headers);
		headers = this.addJsonResponseHeader(headers);
		this.messageService.incrementPendingRequestCount();

		return this.augmentRequest<T>(
			this.http.delete<T>(
				endpointUrl,
				{
					observe: 'response',
					headers: headers,
					params: queryParams,
					responseType: 'json',
					...payload ? {body: JSON.stringify(payload)} : {}
				}
			)
		);
	}

	handleHttpErrors<T>(
		response: any,
		isError: boolean
	): T | never {
		if (response && response.status < 200 || response.status >= 300) {
			if (response.status === 401 || response.status === 403) {
				this.sessionService.handleAuthenticationError();
			} else if (response.status === 0) {
				this.messageService.reportFatalError(`Server Unavailable`);
			} else {
				throw new BadgrApiError(
					`Expected 2xx response; got ${response.status}`,
					response
				);
			}
		}

		if (isError) {
			throw response;
		} else {
			return response;
		}
	}

	private augmentRequest<T>(o: Observable<HttpResponse<T>>): Promise<HttpResponse<T>> {
		return o
			.toPromise()
			.then(r => this.addTestingDelay(r))
			.finally(() => this.messageService.decrementPendingRequestCount())
			.then<HttpResponse<T>>(r => this.handleHttpErrors(r, false), r => this.handleHttpErrors(r, true));
	}

	private addJsonRequestHeader(headers: HttpHeaders) {
		return headers.append('Content-Type', "application/json");
	}
	private addJsonResponseHeader(headers: HttpHeaders) {
		return headers.append('Accept', 'application/json');
	}
	private addAuthTokenHeader(
		headers: HttpHeaders,
		token: AuthorizationToken
	) {
		return headers.append('Authorization', 'Bearer ' + token.access_token);
	}
	private async addTestingDelay<T>(value: T): Promise<T> {
		return BaseHttpApiService.addTestingDelay(
			value,
			this.configService
		);
	}
}
