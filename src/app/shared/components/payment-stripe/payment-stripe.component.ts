import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  inject,
  OnInit,
  Output,
  signal,
  ViewChild
} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {PaymentAction} from '../../enums/payment-action.enum';
import {injectStripe, StripeElementsDirective, StripePaymentElementComponent, StripeServiceInterface} from 'ngx-stripe';
import {StripePaymentElementOptions} from '@stripe/stripe-js';
import {Store} from '@ngxs/store';
import {CurrencyCode} from '../../enums/currency.enum';
import {StripeIntentPayload} from '../../../store/payment/payment.state.model';
import {StripeCheckout} from '../../../store/payment/payment.action';
import {PaymentState} from '../../../store/payment/payment.state';
import {DecimalPipe} from '@angular/common';
import {
  DefaultFlexDirective,
  DefaultLayoutAlignDirective,
  DefaultLayoutDirective,
  DefaultLayoutGapDirective
} from 'ng-flex-layout';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-payment-stripe',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    FormsModule,
    MatButton,
    MatDivider,
    MatCard,
    StripeElementsDirective,
    StripePaymentElementComponent,
    DecimalPipe,
    DefaultLayoutDirective,
    DefaultLayoutGapDirective,
    DefaultFlexDirective,
    DefaultLayoutAlignDirective,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatTooltip,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './payment-stripe.component.html',
  styleUrl: './payment-stripe.component.scss',
})
export class PaymentStripeComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  private readonly store: Store = inject(Store);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  stripe: StripeServiceInterface = injectStripe();

  paying = signal(false);
  paymentElement!: StripePaymentElementComponent;

  @Output() paymentCompleted = new EventEmitter<PaymentAction>();
  @ViewChild(StripePaymentElementComponent)

  appearance: any = {
    theme: 'night',
    variables: {
      fontFamily: 'Sohne, system-ui, sans-serif',
      fontWeightNormal: '500',
      borderRadius: '8px',
      colorBackground: '#0A2540',
      colorPrimary: '#EFC078',
      accessibleColorOnColorPrimary: '#1A1B25',
      colorText: 'white',
      colorTextSecondary: 'white',
      colorTextPlaceholder: '#ABB2BF',
      tabIconColor: 'white',
      logoColor: 'dark'
    },
    rules: {
      '.Input': {
        backgroundColor: '#212D63',
        border: '1px solid var(--colorPrimary)'
      }
    }
  };

  elementsOptions: any = {
    locale: 'en',
    appearance: this.appearance
  };

  paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'accordion',
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: false
    }
  };

  secret: any;
  paymentElementForm!: FormGroup;

  amount: number = 0;
  currency: CurrencyCode = CurrencyCode.USD;
  email: string = 'mfazrul07@gmail.com';
  fullname: string = 'Fazrul Romli';

  orderDetails: { label: string, value: string }[] = [];

  ngOnInit(): void {
    this.amount = this.data.amount ?? 0;
    this.currency = this.data.currency ?? CurrencyCode.USD;

    this.orderDetails = [
      { label: 'Company', value: this.data.company || 'N/A' },
      { label: 'Order Number', value: this.data.orderNumber || '-' },
      { label: 'Product', value: this.data.product || '-' }
    ];

    this.initForms();
    this.initStripe();
  }

  initForms(): void {
    this.paymentElementForm = this.formBuilder.group({
      amount: new FormControl(
        { value: this.currency + ' ' + this.amount, disabled: true },
        [Validators.required, Validators.pattern(/\d+/)]
      )
    });
  }

  initStripe(): void {
    const payload: StripeIntentPayload = {
      amount: this.amount,
      currency: this.currency
    };

    this.store.dispatch(new StripeCheckout(payload));
    this.elementsOptions = {
      ...this.elementsOptions,
      clientSecret: this.store.selectSnapshot(PaymentState.getPaymentSecret)
    };
  }

  pay(): void {
    if (this.paying() || this.paymentElementForm.invalid) return;
    this.paying.set(true);

    const payload: any = {
      elements: this.paymentElement.elements,
      confirmParams: {
        payment_method_data: {
          billing_details: {
            name: this.fullname,
            email: this.email
          }
        }
      },
      redirect: 'if_required'
    };

    this.stripe.confirmPayment(payload).subscribe(result => {
      this.paying.set(false);

      if (result.error) {
        console.log('Failed Payment Response', result);
        this.processPayment(PaymentAction.Failed);
      } else if (result.paymentIntent?.status === 'succeeded') {
        console.log('Success Payment Response', result);
        this.processPayment(PaymentAction.Success);
      }
    });
  }

  processPayment(result: PaymentAction): void {
    // const selectedPlan: any = this.store.selectSnapshot(PolicyPurchaseState.selectedPlan);
    //
    // const payload = {
    //   quotationId: this.quotationDetails.quotationId,
    //   paymentAmount: selectedPlan?.premiumAmount,
    //   duration: Number(selectedPlan?.coverageTerm.match(/\d+/)?.[0] || 0),
    //   paymentStatus: result.toUpperCase(),
    //   planInfo: selectedPlan
    // };
    //
    // this.store.dispatch(new PostPayment(payload)).subscribe({
    //   next: (): void => {
    //     this.paymentCompleted.emit(result);
    //   }
    // });
  }
}
