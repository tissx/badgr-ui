import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bg-breadcrumbs',
  templateUrl: './bg-breadcrumbs.component.html'
})
export class BgBreadcrumbsComponent implements OnInit {
  
  @Input() linkentries: LinkEntry[];

  constructor() { }

  ngOnInit() {
  }

}

export interface LinkEntry {
  routerLink: string[];
  title: string;
  condition?: boolean;
}