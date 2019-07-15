import {Component, Input} from '@angular/core';

@Component({
    selector: 'loading-dots',
    template: '<div class="loaderdots {{className}}"></div>'
})
export class LoadingDotsComponent {
    @Input() className: string;
}
