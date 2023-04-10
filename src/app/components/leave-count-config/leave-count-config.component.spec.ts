import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveCountConfigComponent } from './leave-count-config.component';

describe('LeaveCountConfigComponent', () => {
  let component: LeaveCountConfigComponent;
  let fixture: ComponentFixture<LeaveCountConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveCountConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveCountConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
