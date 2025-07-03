import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSidenavComponent } from './card-sidenav.component';

describe('CardSidenavComponent', () => {
  let component: CardSidenavComponent;
  let fixture: ComponentFixture<CardSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSidenavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
