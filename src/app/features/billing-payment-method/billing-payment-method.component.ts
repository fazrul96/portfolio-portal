import {Component} from '@angular/core';
import {CdkAccordion, CdkAccordionItem} from "@angular/cdk/accordion";
import {PaymentStripeComponent} from "../../shared/components/payment-stripe/payment-stripe.component";
import {BillingProvider, PAYMENT_METHODS_DATA} from "../../shared/data/project.data";
import {MatIcon} from '@angular/material/icon';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-billing-payment-method',
  imports: [
    CdkAccordion,
    CdkAccordionItem,
    MatIcon,
    PaymentStripeComponent,
    NgClass
  ],
  templateUrl: './billing-payment-method.component.html',
  styleUrl: './billing-payment-method.component.scss'
})
export class BillingPaymentMethodComponent {
    protected readonly providers: BillingProvider[] = PAYMENT_METHODS_DATA;
}
