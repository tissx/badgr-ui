import {Component, Input} from "@angular/core";

@Component({
	selector: 'markdown-display',
	host: {
	},
	template: `
		<div class="markdowneditor"
		     [class.markdowneditor-login]="login"
		>	
			<div class="markdowneditor-x-display"
			     [bgMarkdown]="value"
			>Markdown preview</div>
		</div> 
	`
})
export class MarkdownDisplay {
	@Input() value = "";

	@Input() login = false;
}

