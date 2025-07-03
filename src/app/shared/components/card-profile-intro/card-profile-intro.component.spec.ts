import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProfileIntroComponent } from './card-profile-intro.component';

describe('CardProfileIntroComponent', () => {
  let component: CardProfileIntroComponent;
  let fixture: ComponentFixture<CardProfileIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardProfileIntroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardProfileIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
