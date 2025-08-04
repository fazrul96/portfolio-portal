import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingPaymentMethodComponent } from './billing-payment-method.component';

describe('BillingPaymentMethodComponent', () => {
  let component: BillingPaymentMethodComponent;
  let fixture: ComponentFixture<BillingPaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingPaymentMethodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
