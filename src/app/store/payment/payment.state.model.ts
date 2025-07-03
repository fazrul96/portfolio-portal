export const PAYMENT_STATE_DEFAULTS: PaymentStateModel = {
  platform: '',
  amount: 0,
  clientSecret: ''
};

export interface PaymentStateModel {
  platform?: string;
  amount?: number;
  clientSecret?: string;
}

export interface StripeIntentPayload {
  amount: number;
  currency: string;
}
