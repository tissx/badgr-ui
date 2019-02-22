import {Component, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from '../../../common/services/message.service';
import {markControlsDirty} from '../../../common/util/form-util';
import {RecipientBadgeCollection} from '../../models/recipient-badge-collection.model';

@Component({
	selector: 'recipient-badge-collection-edit-form',
	templateUrl: './recipient-badge-collection-edit-form.component.html'
})
export class RecipientBadgeCollectionEditFormComponent {
	@Input() badgeCollection: RecipientBadgeCollection;

	badgeCollectionForm: FormGroup;
	savePromise: Promise<any>;

	isEditing = false;

	constructor(
		formBuilder: FormBuilder,
		private messageService: MessageService
	) {
		this.badgeCollectionForm = formBuilder.group({
			collectionName: [
				'',
				Validators.compose([
					Validators.required,
					Validators.maxLength(128)
				])
			],
			collectionDescription: [
				'',
				Validators.compose([
					Validators.required,
					Validators.maxLength(255)
				])
			]
		} as EditBadgeCollectionForm<any[]>);
	}

	startEditing() {
		this.isEditing = true;

		this.controls.collectionName.setValue(this.badgeCollection.name, { emitEvent: false });
		this.controls.collectionDescription.setValue(this.badgeCollection.description, { emitEvent: false });
	}

	cancelEditing() {
		this.isEditing = false;
	}

	protected get controls(): EditBadgeCollectionForm<FormControl> {
		return this.badgeCollectionForm.controls as any;
	}

	protected submitForm(formState: EditBadgeCollectionForm<string>) {
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

	protected validateForm(ev) {
		if (!this.badgeCollectionForm.valid) {
			ev.preventDefault();
			markControlsDirty(this.badgeCollectionForm);
		}
	}
}

interface EditBadgeCollectionForm<T> {
	collectionName: T;
	collectionDescription: T;
}
