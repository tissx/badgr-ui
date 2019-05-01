import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BaseDialog } from "../../../common/dialogs/base-dialog";
import { FormBuilder, FormGroup } from "@angular/forms";

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
	rawCsv: string = null;

	constructor(
		protected formBuilder: FormBuilder,
		componentElem: ElementRef,
		renderer: Renderer2,
	) {
		super(componentElem, renderer);
		this.csvForm = formBuilder.group({
			zipFile: []
		} as ImportCsvForm<Array<unknown>>);
	}

  ngOnInit() {
		this.openDialog();
  }

	openDialog = () => this.showModal();

	closeDialog = () => this.closeModal();

	onFileDataRecived(data) {
		console.log('this.rawCsv!!!');
		this.rawCsv = data;
		console.log(this.rawCsv);
	}


}

interface ImportCsvForm<T> {
	zipFile: T;
}
