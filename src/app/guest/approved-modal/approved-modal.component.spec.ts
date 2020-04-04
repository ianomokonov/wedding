import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedModalComponent } from './approved-modal.component';

describe('ApprovedModalComponent', () => {
  let component: ApprovedModalComponent;
  let fixture: ComponentFixture<ApprovedModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
