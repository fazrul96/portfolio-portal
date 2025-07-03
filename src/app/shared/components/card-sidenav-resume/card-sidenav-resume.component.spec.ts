import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSidenavResumeComponent } from './card-sidenav-resume.component';

describe('CardSidenavResumeComponent', () => {
  let component: CardSidenavResumeComponent;
  let fixture: ComponentFixture<CardSidenavResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSidenavResumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSidenavResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
