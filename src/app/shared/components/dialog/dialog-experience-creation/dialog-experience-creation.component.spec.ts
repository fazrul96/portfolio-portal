import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExperienceCreationComponent } from './dialog-experience-creation.component';

describe('DialogExperienceCreationComponent', () => {
  let component: DialogExperienceCreationComponent;
  let fixture: ComponentFixture<DialogExperienceCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogExperienceCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogExperienceCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
