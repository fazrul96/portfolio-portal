import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperExperienceComponent } from './stepper-experience.component';

describe('StepperExperienceComponent', () => {
  let component: StepperExperienceComponent;
  let fixture: ComponentFixture<StepperExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepperExperienceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepperExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
