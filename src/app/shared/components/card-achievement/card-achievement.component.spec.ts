import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAchievementComponent } from './card-achievement.component';

describe('CardAchievementComponent', () => {
  let component: CardAchievementComponent;
  let fixture: ComponentFixture<CardAchievementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAchievementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAchievementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
