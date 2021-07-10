import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterSendMailComponent } from './after-send-mail.component';

describe('AfterSendMailComponent', () => {
  let component: AfterSendMailComponent;
  let fixture: ComponentFixture<AfterSendMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfterSendMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterSendMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
