import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordGraphComponent } from './record-graph.component';

describe('recordGraphComponent', () => {
  let component: RecordGraphComponent;
  let fixture: ComponentFixture<RecordGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
