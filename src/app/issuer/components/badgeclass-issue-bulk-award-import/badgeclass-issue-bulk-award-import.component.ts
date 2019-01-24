import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SessionService } from "../../../common/services/session.service";
import { MessageService } from "../../../common/services/message.service";
import { Title } from "@angular/platform-browser";
import { BaseAuthenticatedRoutableComponent } from "../../../common/pages/base-authenticated-routable.component";
import {
	BulkIssueImportPreviewData,
	ColumnHeaders,
	DestSelectOptions,
	ViewState
} from "../badgeclass-issue-bulk-award/badgeclass-issue-bulk-award.component"

@Component({
	selector: 'Badgeclass-issue-bulk-award-import',
	template: `
		<section class="l-containerxaxis l-containeryaxis">
      <div>
		    <article class="contentlong">
					<h3 class="u-text-h3">Instructions</h3>
					<p>
						You may import a list of people to award this badge to. Your file must meet the following requirements:
					</p>
					<ul>
						<li>Contains email address and the Evidence URL.</li>
						<li>CSV or TXT format only.</li>
					</ul>
					<p>
						Use this
						<a [href]="badgrBulkIssueTemplateUrl" download="badgr-bulk-issue-template.csv">
							Sample Template
						</a>
						to create a CSV or TXT file for Bulk Issuing badges.
					</p>
				</article>
				<form [formGroup]="csvForm"
					  class="l-maxWidth">
					<fieldset>
						<bg-formfield-file #fileField
										    label="File"
										    validFileTypes="text/plain,.csv"
										    [control]="csvForm.controls['file']"
										    [placeholderImage]="csvUploadIconUrl"
										    (fileData) = onFileDataRecived($event)>
						</bg-formfield-file>
					</fieldset>
				</form>
			</div>

			<!-- BUTTONS -->
			<div class="l-stack l-stack-buttons">
				<button
					class="button button-primaryghost"
					(click)="updateViewState('cancel')"
				>Cancel</button>

				<button
					class="button l-marginLeft-x2"
					[class.button-is-disabled]="rawCsv === null"
					[attr.disabled] = "rawCsv ? null : true "
					(click)="importAction()"
				>Import</button>
		    </div>
		</section>
	`,
})
export class BadgeClassIssueBulkAwardImportComponent extends BaseAuthenticatedRoutableComponent {
	readonly badgrBulkIssueTemplateUrl = require('file-loader!assets/badgrBulkIssueTemplate.csv');
	readonly csvUploadIconUrl = require('../../../../breakdown/static/images/csvuploadicon.svg');

	@Output() importPreviewDataEmitter = new EventEmitter<BulkIssueImportPreviewData>();
	@Output() updateStateEmitter  = new EventEmitter<ViewState>();

	columnHeadersCount: number;
	csvForm: FormGroup;
	importPreviewData: BulkIssueImportPreviewData;
	issuer: string;
	rawCsv: string = null;
	viewState: ViewState;

	constructor (
		protected formBuilder: FormBuilder,
		protected loginService: SessionService,
		protected messageService: MessageService,
		protected router: Router,
		protected route: ActivatedRoute,
		protected title: Title
	) {
		super(router, route, loginService);

		this.csvForm = formBuilder.group({
			file: []
		} as ImportCsvForm<any[]>)

	}

	importAction() {
		this.parseCsv(this.rawCsv);
		this.importPreviewDataEmit();
	}

	importPreviewDataEmit() {
		this.importPreviewDataEmitter.emit(this.importPreviewData)
	}

	updateViewState(state: ViewState) {
		this.viewState = state;
		this.updateStateEmitter.emit(state)
	}

	onFileDataRecived(data) {
		this.rawCsv = data;
	}


	//////// Parsing ////////
	parseCsv(rawCSV: string) {
		const parseRow = (rawRow: string) => {
			rows.push(
				rawRow.split(',')
					.map(r => r.trim())

			)
		};

		const padRowWithMissingCells =
			(row: string[]) => row.concat(this.createRange(this.columnHeadersCount - row.length));

		const generateColumnHeaders = (): ColumnHeaders[] => {
			let theseColumnHeaders = [];
			let inferredColumnHeaders = new Set<string>();

			rows
				.shift()
				.forEach( (columnHeaderName: string) => {
					let tempColumnHeaderName: string = columnHeaderName.toLowerCase();
					let destinationColumn: DestSelectOptions;

					if ( tempColumnHeaderName === "email") {
						inferredColumnHeaders.add("email");
						destinationColumn = "email";
					}

					if ( tempColumnHeaderName.includes("evidence") ) {
						inferredColumnHeaders.add("evidence");
						destinationColumn = "evidence";
					}

					theseColumnHeaders
						.push(
							{ destColumn: destinationColumn ? destinationColumn : "NA",
							  sourceName: columnHeaderName
							})
				});

			return theseColumnHeaders;
		};

		let rows = [];
		let	validRows: string[][] = [];
		let invalidRows: string[][] = [];

		rawCSV.match(/[^\r\n]+/g)
			.forEach(row => parseRow(row));

		let columnHeaders: ColumnHeaders[] = generateColumnHeaders();
		this.columnHeadersCount = columnHeaders.length;

		rows.forEach( row => {
			// Valid if all the cells in a row are not empty.
			let rowIsValid: boolean = row.every(cell => cell.length > 0)

			if (row.length < this.columnHeadersCount) {
				invalidRows.push(padRowWithMissingCells(row));
			} else {
				rowIsValid
				? validRows.push(row)
				: invalidRows.push(row)
			}
		});

		this.importPreviewData = {
			columnHeaders: columnHeaders,
			invalidRows: invalidRows,
			rowLongerThenHeader:  rows.some( row => row.length > this.columnHeadersCount ),
			rows: rows,
			validRows: validRows
		} as BulkIssueImportPreviewData
	}

	createRange(size: number) {
		let items: string[] = [];
		for (let i = 1; i <= size; i++) {
			items.push("");
		}
		return items;
	}
}

interface ImportCsvForm<T> {
	file: T;
}
