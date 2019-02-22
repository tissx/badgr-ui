import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IssuerStaffCreateDialogComponent} from './issuer-staff-create-dialog.component';
import {BadgrCommonModule, COMMON_IMPORTS} from '../../../common/badgr-common.module';
import {CommonEntityManagerModule} from '../../../entity-manager/entity-manager.module';

describe('IssuerStaffCreateDialogComponent', () => {
  let component: IssuerStaffCreateDialogComponent;
  let fixture: ComponentFixture<IssuerStaffCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuerStaffCreateDialogComponent ],
	    imports: [ ...COMMON_IMPORTS, BadgrCommonModule, CommonEntityManagerModule, ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuerStaffCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
