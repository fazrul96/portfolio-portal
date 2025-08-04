export interface BillingSummaryDto {
  startDate: string;
  endDate: string;
  currency: string;
  totalCost: number;
  description: string;
}

export interface ServiceCostDto {
  serviceName: string;
  unblendedCost: number;
}

export interface ServiceBreakdownItem {
  date: Date | undefined;
  currency: string | undefined;
  serviceName: string;
  cost: string;
  method: string;
  status: string;
  category: string;
  description: string;
}

export interface BillingItemCategory {
  fixed: LocalBillingItem[];
  dynamic: LocalBillingItem[];
  cloud: LocalBillingItem[];
}

export interface LocalBillingItem {
  name: string;
  amount?: number;
  currency: string;
  frequency?: 'monthly' | 'yearly';
  description?: string;
  icon?: string;
  startDate?: string;
  company?: string;
  orderNumber?: string;
  product?: string;
  status?: string;
}
