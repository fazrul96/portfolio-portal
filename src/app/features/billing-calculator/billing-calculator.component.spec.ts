import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingCalculatorComponent } from './billing-calculator.component';

describe('BillingCalculatorComponent', () => {
  let component: BillingCalculatorComponent;
  let fixture: ComponentFixture<BillingCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
