import {Injectable} from "@angular/core";
import {UserCredential} from "../model/user-credential.type";
import {AppConfigService} from "../app-config.service";
import {MessageService} from "./message.service";
import {BaseHttpApiService} from "./base-http-api.service";
import {SocialAccountProviderInfo, socialAccountProviderInfos} from "../model/user-profile-api.model";
import {throwExpr} from "../util/throw-expr";
import {UpdatableSubject} from "../util/updatable-subject";
import {HttpClient, HttpHeaders} from "@angular/common/http";

/**
 * The key used to store the authentication token in session and local storage.
 *
 * NOTE: This name is also referenced in the landing redirect code in index.html.
 *
 * @type {string}
 */
export const TOKEN_STORAGE_KEY = "LoginService.token";

export interface AuthorizationToken {
	access_token: string;
}

@Injectable()
export class SessionService {
	baseUrl: string;

	enabledExternalAuthProviders: SocialAccountProviderInfo[];

	private loggedInSubect = new UpdatableSubject<boolean>();
	get loggedin$() { return this.loggedInSubect.asObservable() }

	constructor(
		private http: HttpClient,
		private configService: AppConfigService,
		private messageService: MessageService,
	) {
		this.baseUrl = this.configService.apiConfig.baseUrl;
		this.enabledExternalAuthProviders = socialAccountProviderInfos.filter(providerInfo =>
			! this.configService.featuresConfig.socialAccountProviders || this.configService.featuresConfig.socialAccountProviders.includes(providerInfo.slug)
		);
	}

	login(credential: UserCredential, sessionOnlyStorage: boolean = false): Promise<AuthorizationToken> {
		const endpoint = this.baseUrl + '/o/token';
		const scope = "rw:profile rw:issuer rw:backpack";
		const client_id = "public";

		const payload = `grant_type=password&client_id=${encodeURIComponent(client_id)}&scope=${encodeURIComponent(scope)}&username=${encodeURIComponent(credential.username)}&password=${encodeURIComponent(credential.password)}`;

		const headers = new HttpHeaders()
			.append('Content-Type', 'application/x-www-form-urlencoded');

		// Update global loading state
		this.messageService.incrementPendingRequestCount();

		return this.http
			.post(
				endpoint,
				payload,
				{
					observe: "response",
					responseType: "json",
					headers: headers
				}
			)
			.toPromise()
			.then(r => BaseHttpApiService.addTestingDelay(r, this.configService))
			.finally(
				() => this.messageService.decrementPendingRequestCount()
			)
			.then(r => {
				if (r.status < 200 || r.status >= 300) {
					throw new Error("Login Failed: " + r.status);
				}

				return r.body;
			})
			.then(
				(result: AuthorizationToken) => {
					this.storeToken(result, sessionOnlyStorage);
					return result
				}
			);
	}

	initiateUnauthenticatedExternalAuth(provider: SocialAccountProviderInfo) {
		window.location.href = `${this.baseUrl}/account/sociallogin?provider=${encodeURIComponent(provider.slug)}`;
	}

	logout(): void {
		localStorage.removeItem(TOKEN_STORAGE_KEY);
		sessionStorage.removeItem(TOKEN_STORAGE_KEY);

		this.loggedInSubect.next(false);
	}

	storeToken(token: AuthorizationToken, sessionOnlyStorage = false): void {
		if (sessionOnlyStorage) {
			sessionStorage.setItem(TOKEN_STORAGE_KEY, token.access_token);
		} else {
			localStorage.setItem(TOKEN_STORAGE_KEY, token.access_token);
		}
		this.loggedInSubect.next(true);
	}

	get currentAuthToken(): AuthorizationToken | null {
		const tokenString = sessionStorage.getItem(TOKEN_STORAGE_KEY) || localStorage.getItem(TOKEN_STORAGE_KEY) || null;

		return tokenString
			? { access_token: tokenString }
			: null;
	}

	get requiredAuthToken(): AuthorizationToken {
		return this.currentAuthToken || throwExpr("An authentication token is required, but the user is not logged in.")
	}

	get isLoggedIn() {
		return !!(sessionStorage.getItem(TOKEN_STORAGE_KEY) || localStorage.getItem(TOKEN_STORAGE_KEY));
	}

	exchangeCodeForToken(authCode: string): Promise<AuthorizationToken> {
		return this.http.post<AuthorizationToken>(
			this.baseUrl + '/o/code',
			'code=' + encodeURIComponent(authCode),
			{
				observe: "response",
				responseType: "json",
				headers: new HttpHeaders()
					.append('Content-Type', 'application/x-www-form-urlencoded')
			}
		).toPromise()
			.then(r => r.body);
	}

	submitResetPasswordRequest(email: string) {
		// TODO: Define the type of this response
		return this.http.post<any>(
			this.baseUrl + '/v1/user/forgot-password',
			'email=' + encodeURIComponent(email),
			{
				observe: "response",
				responseType: "json",
				headers: new HttpHeaders()
					.append('Content-Type', 'application/x-www-form-urlencoded')
			}
		).toPromise();
	}

	submitForgotPasswordChange(newPassword: string, token: string) {
		// TODO: Define the type of this response
		return this.http.put<any>(
			this.baseUrl + '/v1/user/forgot-password',
			{ password: newPassword, token: token },
			{
				observe: "response",
				responseType: "json"
			}
			).toPromise();
	}
}
