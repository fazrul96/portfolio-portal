import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProjectAutomationComponent } from './card-project-automation.component';

describe('CardProjectAutomationComponent', () => {
  let component: CardProjectAutomationComponent;
  let fixture: ComponentFixture<CardProjectAutomationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardProjectAutomationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardProjectAutomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
