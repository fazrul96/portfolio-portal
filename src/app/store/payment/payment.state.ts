import {Action, Selector, State, StateContext} from '@ngxs/store';
import {inject, Injectable} from '@angular/core';
import {PAYMENT_STATE_DEFAULTS, PaymentStateModel} from './payment.state.model';
import {StripeCheckout} from './payment.action';
import {map, tap} from 'rxjs';
import {HttpResponseBody} from '../../core/models/http-body.model';
import {PaymentService} from '../../core/services/api/payment/payment.service';
import {injectStripe} from 'ngx-stripe';

@State<PaymentStateModel>({
  name: 'PaymentState',
  defaults: PAYMENT_STATE_DEFAULTS
})

@Injectable()
export class PaymentState {
  private readonly paymentService: PaymentService = inject(PaymentService);
  stripe = injectStripe();

  @Selector()
  static getPaymentSecret(state: PaymentStateModel) {
    return state.clientSecret;
  }

  @Action(StripeCheckout)
  checkoutStripe(ctx: StateContext<PaymentStateModel>, { payload }: StripeCheckout) {
    const state: PaymentStateModel = ctx.getState();
    return this.paymentService.stripeCheckout(payload).pipe(
      tap((response: HttpResponseBody): void => {
        ctx.setState({
          ...state,
            clientSecret: response.data.secret,
            platform: response.data.platform
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }
}
