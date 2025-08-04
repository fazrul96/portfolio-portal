import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatCard} from "@angular/material/card";
import {MatIcon} from '@angular/material/icon';
import {Subject, takeUntil} from 'rxjs';
import {COMMON_CONSTANTS} from '../../shared/constants/common.constants';
import {Store} from '@ngxs/store';
import {BillingSummaryDto, LocalBillingItem} from '../../shared/types/billing.type';
import {formatDisplayDate} from '../../shared/utils/date.utils';
import {BillingState} from '../../store/billing/billing.state';
import {CurrencyCode} from '../../shared/enums/currency.enum';

@Component({
  selector: 'app-billing-history',
    imports: [
        DatePipe,
        MatAccordion,
        MatCard,
        MatExpansionPanel,
        MatExpansionPanelDescription,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        MatIcon
    ],
  templateUrl: './billing-history.component.html',
  styleUrl: './billing-history.component.scss'
})
export class BillingHistoryComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly unsubscribe$ = new Subject();

  previousMonthSummary: BillingSummaryDto | null = null;
  startDate: Date = new Date();
  cloudBilling: LocalBillingItem[] = [];
  fixedBilling: LocalBillingItem[] = [];
  dynamicBilling: LocalBillingItem[] = [];

  ngOnInit(): void {
    this.store.select(BillingState.previousMonthSummary)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(summary => {
        this.previousMonthSummary = summary;
        this.populateCloudBilling();
      });

    this.store.select(BillingState.fixedBilling)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(fixed => {
        this.fixedBilling = fixed ?? [];
      });

    this.store.select(BillingState.dynamicBilling)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(dynamic => {
        this.dynamicBilling = dynamic ?? [];
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(COMMON_CONSTANTS.EMPTY_STRING);
    this.unsubscribe$.complete();
  }

  private populateCloudBilling(): void {
    const summary = this.previousMonthSummary;

    if (!summary) return;

    this.cloudBilling = [
      {
        name: 'AWS Cloud',
        icon: 'cloud',
        description: 'Cloud infrastructure billing',
        amount: summary.totalCost ?? 0,
        currency: summary.currency ?? CurrencyCode.USD,
        startDate: formatDisplayDate(summary.startDate),
        company: 'Amazon Web Services',
        orderNumber: 'AWS-20250801',
        product: 'Cloud EC2, S3, RDS',
      },
      {
        name: 'Namecheap',
        icon: 'dns',
        description: 'Domain and DNS billing',
        amount: summary.totalCost ?? 0,
        currency: summary.currency ?? CurrencyCode.USD,
        startDate: formatDisplayDate(summary.startDate),
        company: 'Namecheap Inc.',
        orderNumber: 'NC-20250801',
        product: 'Domains & Hosting',
      }
    ];
  }

  get allBillings(): any[] {
    const fixedMapped = this.fixedBilling.map((bill, i) => ({
      ...bill,
      icon: 'fact_check',
      amount: bill.amount ?? 0,
      startDate: bill.startDate ?? formatDisplayDate(new Date().toISOString()),
      orderNumber: `INV20250801-FIXED-${i + 1}`,
      product: bill.name,
      status: 'Paid',
    }));

    const dynamicMapped = this.dynamicBilling.map((bill, i) => ({
      ...bill,
      icon: 'bolt',
      amount: bill.amount ?? 0,
      startDate: bill.startDate ?? formatDisplayDate(new Date().toISOString()),
      orderNumber: `INV20250801-DYNAMIC-${i + 1}`,
      product: bill.name,
      status: 'Paid',
    }));

    const cloudMapped: LocalBillingItem[] = this.cloudBilling.map((bill, i) => ({
      ...bill,
      amount: bill.amount ?? 0,
      orderNumber: bill.orderNumber ?? `INV20250801-CLOUD-${i + 1}`,
      status: 'Paid',
    }));

    return [...cloudMapped, ...fixedMapped, ...dynamicMapped].sort((a, b) => {
      const dateA: number = new Date(a.startDate ?? COMMON_CONSTANTS.EMPTY_STRING).getTime();
      const dateB: number = new Date(b.startDate ?? COMMON_CONSTANTS.EMPTY_STRING).getTime();
      return dateB - dateA;
    });
  }

  getCategoryIcon(category: string): string {
    const iconMap: Record<string, string> = {
      'AWS Cloud': 'cloud',
      'Email API': 'mail',
      'Entertainment': 'movie',
      'Namecheap': 'language',
      'Analytics': 'bar_chart',
      'Utilities': 'bar_chart'
    };
    return iconMap[category] || 'receipt';
  }
}
