import {StripeIntentPayload} from './payment.state.model';

export class StripeCheckout {
  static readonly type = '[PAYMENT] CHECKOUT STRIPE';
  constructor(public payload: StripeIntentPayload) {}
}

export class StripeConfirmPayment {
  static readonly type = '[PAYMENT] CONFIRMATION PAYMENT';
  constructor(public payload: any) {}
}
