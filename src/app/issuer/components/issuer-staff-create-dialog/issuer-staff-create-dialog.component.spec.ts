import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuerStaffCreateDialogComponent } from './issuer-staff-create-dialog.component';

describe('IssuerStaffCreateDialogComponent', () => {
  let component: IssuerStaffCreateDialogComponent;
  let fixture: ComponentFixture<IssuerStaffCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuerStaffCreateDialogComponent ]
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
