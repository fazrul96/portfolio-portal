import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAutomationDetailsComponent } from './dialog-automation-details.component';

describe('DialogAutomationDetailsComponent', () => {
  let component: DialogAutomationDetailsComponent;
  let fixture: ComponentFixture<DialogAutomationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAutomationDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAutomationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
