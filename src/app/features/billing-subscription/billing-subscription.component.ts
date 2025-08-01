import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {Store} from '@ngxs/store';
import {Subject, takeUntil} from 'rxjs';
import {AWS_SERVICE_META_DATA, COMMON_CONSTANTS} from '../../shared/constants/common.constants';
import {BillingState} from '../../store/billing/billing.state';
import {BillingSummaryDto, ServiceBreakdownItem} from '../../shared/types/billing.type';
import {DatePipe} from '@angular/common';
import {CurrencyCode} from '../../shared/enums/currency.enum';
import Decimal from 'decimal.js';

@Component({
  selector: 'app-billing-subscription',
  imports: [
    MatButton,
    MatCard,
    MatIcon,
    DatePipe
  ],
  templateUrl: './billing-subscription.component.html',
  styleUrl: './billing-subscription.component.scss'
})
export class BillingSubscriptionComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly unsubscribe$ = new Subject();

  billingHistory: BillingSummaryDto | null = null;
  serviceBreakdown: ServiceBreakdownItem[] = [];
  totalAmount: Decimal = new Decimal(0);
  startDate: Date = new Date();

  ngOnInit(): void {
    this.store.select(BillingState.previousMonthSummary)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => this.billingHistory = data);

    this.store.select(BillingState.previousMonthServiceBreakdown)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.serviceBreakdown = this.mapServiceBreakdown(data);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(COMMON_CONSTANTS.EMPTY_STRING);
    this.unsubscribe$.complete();
  }

  private mapServiceBreakdown(data: any[] | null): ServiceBreakdownItem[] {
    if (!this.billingHistory) return [];

    const filtered = (data ?? []).filter(d => d.unblendedCost > 0);
    const currency: string = this.billingHistory.currency ?? CurrencyCode.USD;
    const startDate: Date = this.billingHistory.startDate
      ? new Date(this.billingHistory.startDate)
      : new Date();
    this.totalAmount = filtered.reduce(
      (sum, item) => sum.plus(item.unblendedCost ?? 0),
      new Decimal(0)
    );
    const sorted = filtered.slice().sort((a, b) => b.unblendedCost - a.unblendedCost);

    return sorted.map(service => {
      const meta = AWS_SERVICE_META_DATA[service.serviceName] || {};

      return {
        date: startDate,
        currency: currency,
        serviceName: service.serviceName ?? 'Unknown Service',
        cost: new Decimal(service.unblendedCost ?? 0).toFixed(2),
        method: meta.method ?? 'AWS Service',
        status: 'Paid',
        category: meta.category ?? 'Cloud Service',
        description: meta.description ?? `${service.serviceName} usage`
      };
    });
  }
}
