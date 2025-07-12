import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLeetcodeComponent } from './card-leetcode.component';

describe('CardLeetcodeComponent', () => {
  let component: CardLeetcodeComponent;
  let fixture: ComponentFixture<CardLeetcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardLeetcodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardLeetcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
