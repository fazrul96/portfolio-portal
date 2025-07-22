import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAccessComponent } from './dialog-access.component';

describe('DialogAccessComponent', () => {
  let component: DialogAccessComponent;
  let fixture: ComponentFixture<DialogAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
