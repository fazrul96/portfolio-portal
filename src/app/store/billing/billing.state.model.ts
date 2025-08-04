import {BillingSummaryDto, LocalBillingItem, ServiceCostDto} from '../../shared/types/billing.type';

export const BILLING_STATE_DEFAULTS: BillingStateModel = {
  previousMonthSummary: {
    startDate: '',
    endDate: '',
    currency: '',
    totalCost: 0,
    description: ''
  },
  previousMonthServices: [],
  fixedBilling: [
    {
      name: 'Internet – Unifi Home',
      amount: 94.35,
      currency: 'MYR',
      frequency: 'monthly',
      description: 'Unifi Home 100Mbps',
      company: 'Telekom Malaysia'
    },
    {
      name: 'Phone – Unifi Mobile',
      amount: 126.15,
      currency: 'MYR',
      frequency: 'monthly',
      description: 'UNI5G Postpaid Family 129 mobile postpaid phone bill',
      company: 'Telekom Malaysia'
    },
    {
      name: 'Rental – Home',
      amount: 800,
      currency: 'MYR',
      frequency: 'monthly',
      description: 'Monthly house rental payment',
      company: 'Owner Unit'
    },
    {
      name: 'Streaming – Netflix',
      amount: 55,
      currency: 'MYR',
      frequency: 'monthly',
      description: 'Netflix Premium subscription',
      company: 'Netflix'
    },
    {
      name: 'Domain – Namecheap',
      amount: 60,
      currency: 'USD',
      frequency: 'yearly',
      description: 'Annual domain renewal via Namecheap',
      company: 'Namecheap'
    }
  ],
  dynamicBilling: [
    {
      name: 'Utilities – Water',
      currency: 'MYR',
      amount: 20,
      frequency: 'monthly',
      description: 'Monthly water utility bill (based on usage)',
      company: 'Indah Water Selangor'
    },
    {
      name: 'Utilities – Electricity',
      currency: 'MYR',
      amount: 120,
      frequency: 'monthly',
      description: 'Monthly electricity bill (based on usage)',
      company: 'TNB Malaysia'
    },
    {
      name: 'Mortgage – Home',
      amount: 1700,
      currency: 'MYR',
      frequency: 'monthly',
      description: 'Monthly house rental payment',
      company: 'RHB Banking'
    },
  ]
};

export interface BillingStateModel  {
  previousMonthSummary: BillingSummaryDto;
  previousMonthServices: ServiceCostDto[];
  fixedBilling: LocalBillingItem[];
  dynamicBilling: LocalBillingItem[];
}
