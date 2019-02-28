import {Component, Input} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MessageService} from '../../../common/services/message.service';
import {markControlsDirty} from '../../../common/util/form-util';
import {RecipientBadgeCollection} from '../../models/recipient-badge-collection.model';
import {typedFormGroup} from '../../../common/util/typed-forms';

@Component({
	selector: 'recipient-badge-collection-edit-form',
	templateUrl: './recipient-badge-collection-edit-form.component.html'
})
export class RecipientBadgeCollectionEditFormComponent {
	@Input() badgeCollection: RecipientBadgeCollection;

	badgeCollectionForm = typedFormGroup()
		.addControl('collectionName', '', [Validators.required, Validators.maxLength(128)])
		.addControl('collectionDescription', '', [Validators.required, Validators.maxLength(255)])
	;

	savePromise: Promise<unknown>;

	isEditing = false;

	constructor(
		private messageService: MessageService
	) {
	}

	startEditing() {
		this.isEditing = true;

		this.badgeCollectionForm.controls.collectionName.setValue(this.badgeCollection.name, {emitEvent: false});
		this.badgeCollectionForm.controls.collectionDescription.setValue(this.badgeCollection.description, {emitEvent: false});
	}

	cancelEditing() {
		this.isEditing = false;
	}

	protected submitForm() {
		if (! this.badgeCollectionForm.markTreeDirtyAndValidate()) {
			return;
		}

		const formState = this.badgeCollectionForm.value;

		if (this.badgeCollectionForm.valid) {
			this.badgeCollection.name = formState.collectionName;
			this.badgeCollection.description = formState.collectionDescription;

			this.savePromise = this.badgeCollection.save()
				.then(
					success => {
						this.isEditing = false;
						this.messageService.reportMinorSuccess(`Saved changes to collection ${this.badgeCollection.name}`);
					},
					failure => this.messageService.reportHandledError(`Failed to save changes to collection ${this.badgeCollection.name}`)
				).then(
					() => this.savePromise = null
				);
		}
	}
}
