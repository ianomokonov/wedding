import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestsTableComponent } from './guests-table.component';

describe('GuestsTableComponent', () => {
  let component: GuestsTableComponent;
  let fixture: ComponentFixture<GuestsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
