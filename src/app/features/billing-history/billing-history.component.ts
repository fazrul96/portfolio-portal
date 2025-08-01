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
import {Subject} from 'rxjs';
import {COMMON_CONSTANTS} from '../../shared/constants/common.constants';
import {Store} from '@ngxs/store';
import {ServiceBreakdownItem} from '../../shared/types/billing.type';
import Decimal from 'decimal.js';

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

  billingHistory = [
    {
      date: new Date('2025-07-01'),
      amount: 0.87,
      method: 'AWS',
      status: 'Paid',
      category: 'Cloud Solution',
      description: 'S3 monthly usage (5.4GB)'
    },
    {
      date: new Date('2025-07-01'),
      amount: 8.88,
      method: 'Namecheap DNS',
      status: 'Paid',
      category: 'Domain',
      description: 'DNS service renewal'
    },
    {
      date: new Date('2025-07-01'),
      amount: 55.00,
      method: 'Netflix',
      status: 'Pending',
      category: 'Entertainment',
      description: 'Monthly family plan'
    },
    {
      date: new Date('2025-06-15'),
      amount: 20.00,
      method: 'Resend',
      status: 'Paid',
      category: 'Email API',
      description: 'Transactional email usage'
    }
  ];
  serviceBreakdown: ServiceBreakdownItem[] = [];
  totalAmount: Decimal = new Decimal(0);
  startDate: Date = new Date();

  ngOnInit(): void {
    // this.store.select(BillingState.previousMonthSummary)
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(summary => this.previousMonthSummary = summary);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(COMMON_CONSTANTS.EMPTY_STRING);
    this.unsubscribe$.complete();
  }

  getCategoryIcon(category: string): string {
    const iconMap: Record<string, string> = {
      'Cloud Storage': 'cloud',
      'Email API': 'mail',
      'Entertainment': 'movie',
      'Domain': 'language',
      'Analytics': 'bar_chart'
    };
    return iconMap[category] || 'receipt';
  }
}
