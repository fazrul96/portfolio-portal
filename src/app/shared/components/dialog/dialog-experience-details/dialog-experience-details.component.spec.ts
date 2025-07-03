import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExperienceDetailsComponent } from './dialog-experience-details.component';

describe('DialogExperienceDetailsComponent', () => {
  let component: DialogExperienceDetailsComponent;
  let fixture: ComponentFixture<DialogExperienceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogExperienceDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogExperienceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
