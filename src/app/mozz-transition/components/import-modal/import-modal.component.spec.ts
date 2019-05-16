import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportModalComponent } from './import-modal.component';
import { RouterTestingModule } from "@angular/router/testing";
import { BadgrCommonModule, COMMON_IMPORTS } from "../../../common/badgr-common.module";
import { ZipService } from "../../../common/util/zip-service/zip-service.service";
import {
	COMMON_MOCKS_PROVIDERS_WITH_SUBS,
} from "../../../mocks/mocks.module";

describe('ImportModalComponent', () => {
  let component: ImportModalComponent;
  let fixture: ComponentFixture<ImportModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportModalComponent ],
			imports: [
				RouterTestingModule,
				BadgrCommonModule,
				...COMMON_IMPORTS,
			],
			providers: [
				...COMMON_MOCKS_PROVIDERS_WITH_SUBS,
			],
		})
    .compileComponents();
		fixture = TestBed.createComponent(ImportModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
