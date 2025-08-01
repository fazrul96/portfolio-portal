import {BillingSummaryDto, ServiceCostDto} from '../../shared/types/billing.type';

export const BILLING_STATE_DEFAULTS: BillingStateModel = {
  previousMonthSummary: {
    startDate: '',
    endDate: '',
    currency: '',
    totalCost: 0,
    description: ''
  },
  previousMonthServices: []
};

export interface BillingStateModel  {
  previousMonthSummary: BillingSummaryDto;
  previousMonthServices: ServiceCostDto[];
}
