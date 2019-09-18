import { Injectable } from '@angular/core';
import { ConfirmDialog } from '../dialogs/confirm-dialog.component';
import { ShareSocialDialog } from '../dialogs/share-social-dialog/share-social-dialog.component';
import { NewTermsDialog } from '../dialogs/new-terms-dialog.component';
import { MarkdownHintsDialog } from '../dialogs/markdown-hints-dialog.component';
import { VerifyBadgeDialog } from '../dialogs/verify-badge-dialog/verify-badge-dialog.component';


@Injectable()
export class CommonDialogsService {
	confirmDialog: ConfirmDialog;
	shareSocialDialog: ShareSocialDialog;
	newTermsDialog: NewTermsDialog;
	markdownHintsDialog: MarkdownHintsDialog;
	verifyBadgeDialog: VerifyBadgeDialog;

	constructor() {}

	init(
		confirmDialog: ConfirmDialog,
		shareSocialDialog: ShareSocialDialog,
		newTermsDialog: NewTermsDialog,
		markdownHintsDialog: MarkdownHintsDialog,
		verifyBadgeDialog: VerifyBadgeDialog,
	) {
		this.confirmDialog = confirmDialog;
		this.shareSocialDialog = shareSocialDialog;
		this.newTermsDialog = newTermsDialog;
		this.markdownHintsDialog = markdownHintsDialog;
		this.verifyBadgeDialog = verifyBadgeDialog;
	}
}
