import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAutomationVideoComponent } from './dialog-automation-video.component';

describe('DialogAutomationVideoComponent', () => {
  let component: DialogAutomationVideoComponent;
  let fixture: ComponentFixture<DialogAutomationVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAutomationVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAutomationVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
