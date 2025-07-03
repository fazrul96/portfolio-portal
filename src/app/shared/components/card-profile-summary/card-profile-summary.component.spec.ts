import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProfileSummaryComponent } from './card-profile-summary.component';

describe('CardProfileSummaryComponent', () => {
  let component: CardProfileSummaryComponent;
  let fixture: ComponentFixture<CardProfileSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardProfileSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardProfileSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
