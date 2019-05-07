import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BaseDialog } from "../../../common/dialogs/base-dialog";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ZipService } from "../../../common/util/zip-service/zip-service.service";
import { ZipEntry } from "../../../common/util/zip-service/interfaces/zip-entry.interface";
import { RecipientBadgeManager } from "../../../recipient/services/recipient-badge-manager.service";
import { MessageService } from "../../../common/services/message.service";
import { UserProfileApiService } from "../../../common/services/user-profile-api.service";

@Component({
  selector: 'import-modal',
  templateUrl: './import-modal.component.html',
  styleUrls: ['./import-modal.component.css']
})
export class ImportModalComponent extends BaseDialog implements OnInit {

	@ViewChild("importModalDialog")
	importModalDialog: ImportModalComponent;
	csvForm: FormGroup;
	readonly csvUploadIconUrl = require('../../../../breakdown/static/images/csvuploadicon.svg');
	files: ZipEntry[];
	file: ZipEntry;
	badgeUploadPromise: Promise<unknown>;
	noManifestError = false;
	inProgress = 0;
	serverErrors: ServerError[] = [];
	unverifiedEmails: UnverifiedEmail[] = [];

	constructor(
		protected formBuilder: FormBuilder,
		componentElem: ElementRef,
		renderer: Renderer2,
		private zipService: ZipService,
		protected recipientBadgeManager: RecipientBadgeManager,
		protected messageService: MessageService,
		private userProfileApiService: UserProfileApiService,
	) {
		super(componentElem, renderer);
		this.csvForm = formBuilder.group({
			zipFile: []
		} as ImportCsvForm<Array<unknown>>);
	}

  ngOnInit() {
		// this.openDialog();
	}

	openDialog = () => this.showModal();

	closeDialog = () => this.closeModal();

	parseManifest = (m) => {
		const manifest = JSON.parse(m);
		Object.keys(manifest).forEach((email) => {
			const reader = new FileReader();
			reader.onload = (e) => this.uploadImage(email,reader.result).then(() => {
				this.inProgress--;
			});
			manifest[email].forEach((f) => {
				this.inProgress++;
				const image = this.files.filter(m => m.filename === f)[0];
				this.zipService.getData(image).data.subscribe(fileData => {
					reader.readAsDataURL(fileData);
				});
			});
		});
	};

	uploadImage(email, base64Image) {

			return this.badgeUploadPromise = this.recipientBadgeManager
				.createRecipientBadge({image:base64Image})
				.then(instance => {
					//this.serverError.splice(this.serverError.indexOf(filename),1);
					this.messageService.reportMajorSuccess("Badge successfully imported.");
					this.closeDialog();
				})
				.catch(err => {
					// let message = BadgrApiFailure.from(err).firstMessage;
					let message = err.response.error[0].description;

					// display human readable description of first error if provided by server
					if (err.response && err.response._body) {
						const body = JSON.parse(err.response._body);
						if (body && body.length > 0 && body[0].description) {
							message = body[0].description;
						}
					}

					if(message === 'The recipient does not match any of your verified emails'){
						const counter = this.unverifiedEmails.findIndex(ue => ue.email === email);
						if (counter > 0) {
							this.unverifiedEmails.splice(counter,1,{
								'email': email,
								'count': this.unverifiedEmails[counter].count++,
								verify: true
							});
						} else {
							this.unverifiedEmails.push({
								'email': email,
								'count': 1,
								verify: true
							});
						}
					} else {
						this.serverErrors.push({
							'email': email,
							'base64Image': base64Image,
							'error': message
						});
					}

					/*this.messageService.reportAndThrowError(
						message
							? `Failed to upload badge: ${message}`
							: `Badge upload failed due to an unknown error`,
						err
					);*/
				});
	}

	fileChanged(event) {
		this.file = event.target.files[0];
		if(!this.file) return false;
		this.zipService.getEntries(this.file).subscribe(files => {
			this.serverErrors = [];
			this.files = files;
			const manifest = files.filter(m => m.filename === "manifest.txt")[0];
			if(manifest) {
				this.noManifestError = false;
				const reader = new FileReader();
				reader.onload = (e) => this.parseManifest(reader.result);
				this.zipService.getData(manifest).data.subscribe(f => reader.readAsText(f));
			} else {
				this.noManifestError = true;
				return false;
			}
		});

	}

	verifyEmails(){
		this.unverifiedEmails
			.filter(email => email.verify)
			.forEach(email => this.userProfileApiService.addEmail(email.email));
	}

}

interface ServerError {
	email: string;
	base64Image: string;
	error: string;
}

interface UnverifiedEmail {
	email: string;
	count: number;
	verify: boolean;
}

interface ImportCsvForm<T> {
	zipFile: T;
}
