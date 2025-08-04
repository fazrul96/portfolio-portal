import {Action, Selector, State, StateContext} from '@ngxs/store';
import {inject, Injectable} from '@angular/core';
import {map, tap} from 'rxjs';
import {HttpResponseBody, HttpResponseBodyMedium} from '../../core/models/http-body.model';
import {BILLING_STATE_DEFAULTS, BillingStateModel} from './billing.state.model';
import {BillingService} from '../../core/services/api/aws/billing.service';
import {GetPreviousMonthByService, GetPreviousMonthSummary} from './billing.action';
import {BillingSummaryDto, LocalBillingItem} from '../../shared/types/billing.type';

@State<BillingStateModel>({
  name: 'BillingState',
  defaults: BILLING_STATE_DEFAULTS
})

@Injectable()
export class BillingState {
  private readonly billingService: BillingService = inject(BillingService);

  @Selector()
  static previousMonthSummary(state: BillingStateModel): BillingSummaryDto | null {
    return state.previousMonthSummary;
  }

  @Selector()
  static previousMonthServiceBreakdown(state: BillingStateModel): any[] | null {
    return state.previousMonthServices;
  }

  @Selector()
  static fixedBilling(state: BillingStateModel): LocalBillingItem[] | null {
    return state.fixedBilling;
  }

  @Selector()
  static dynamicBilling(state: BillingStateModel): LocalBillingItem[] | null {
    return state.dynamicBilling;
  }

  @Action(GetPreviousMonthSummary)
  getPreviousMonthItem(ctx: StateContext<BillingStateModel>){
    return this.billingService.getPreviousMonthSummary().pipe(
      tap((response: HttpResponseBodyMedium): void => {
        ctx.patchState({
          previousMonthSummary: response.data
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }

  @Action(GetPreviousMonthByService)
  getPreviousMonthByService(ctx: StateContext<BillingStateModel>){
    return this.billingService.getPreviousMonthByService().pipe(
      tap((response: HttpResponseBodyMedium): void => {
        ctx.patchState({
          previousMonthServices: response.data
        });
      }),
      map((response: HttpResponseBody) => response.message)
    )
  }
}
