import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConformDialogComponent } from './conform-dialog.component';

describe('ConformDialogComponent', () => {
  let component: ConformDialogComponent;
  let fixture: ComponentFixture<ConformDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConformDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConformDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
