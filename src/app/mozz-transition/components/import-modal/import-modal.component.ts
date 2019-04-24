import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BaseDialog } from "../../../common/dialogs/base-dialog";

@Component({
  selector: 'import-modal',
  templateUrl: './import-modal.component.html',
  styleUrls: ['./import-modal.component.css']
})
export class ImportModalComponent extends BaseDialog implements OnInit {

	@ViewChild("importModalDialog")
	importModalDialog: ImportModalComponent;

	constructor(
		componentElem: ElementRef,
		renderer: Renderer2,
	) {
		super(componentElem, renderer);
	}

  ngOnInit() {
		this.openDialog();
  }
	openDialog = () => this.showModal();

	closeDialog = () => this.closeModal();

}
