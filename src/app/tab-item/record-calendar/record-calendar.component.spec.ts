import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordCalendarComponent } from './record-calendar.component';

describe('RecordCalendarComponent', () => {
  let component: RecordCalendarComponent;
  let fixture: ComponentFixture<RecordCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
