import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GratitudeModalComponent } from './gratitude-modal.component';

describe('GratitudeModalComponent', () => {
  let component: GratitudeModalComponent;
  let fixture: ComponentFixture<GratitudeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GratitudeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GratitudeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
