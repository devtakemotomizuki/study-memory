import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordAndDisplayComponent } from './record-and-display.component';

describe('RecordAndDisplayComponent', () => {
  let component: RecordAndDisplayComponent;
  let fixture: ComponentFixture<RecordAndDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordAndDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordAndDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
