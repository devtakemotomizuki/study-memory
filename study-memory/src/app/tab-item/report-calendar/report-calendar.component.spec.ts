import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCalendarComponent } from './report-calendar.component';

describe('ReportCalendarComponent', () => {
  let component: ReportCalendarComponent;
  let fixture: ComponentFixture<ReportCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
