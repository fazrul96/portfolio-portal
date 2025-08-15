import {Component, inject, OnDestroy, OnInit, Signal} from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {DialogService} from '../../core/services/dialog.service';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngxs/store';
import {UserService} from '../../core/services/api/user.service';
import {SweetAlertService} from '../../core/services/sweet-alert.service';
import {Subject, takeUntil} from 'rxjs';
import {COMMON_CONSTANTS} from '../../shared/constants/common.constants';
import {BillingHistoryComponent} from '../billing-history/billing-history.component';
import {BillingSubscriptionComponent} from '../billing-subscription/billing-subscription.component';
import {GetPreviousMonthByService, GetPreviousMonthSummary} from '../../store/billing/billing.action';
import {BillingState} from '../../store/billing/billing.state';
import {BillingItemCategory, BillingSummaryDto, LocalBillingItem} from '../../shared/types/billing.type';
import {formatDisplayDate} from '../../shared/utils/date.utils';
import {PaymentStripeComponent} from '../../shared/components/payment-stripe/payment-stripe.component';
import {CurrencyCode} from '../../shared/enums/currency.enum';
import {MatTooltip} from '@angular/material/tooltip';
import {BillingCalculatorComponent} from '../billing-calculator/billing-calculator.component';

@Component({
  selector: 'app-billing',
  imports: [
    MatTabGroup,
    MatTab,
    MatCard,
    MatButton,
    MatIcon,
    BillingHistoryComponent,
    BillingSubscriptionComponent,
    MatTooltip,
    BillingCalculatorComponent
  ],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss'
})
export class BillingComponent implements OnInit, OnDestroy {
  private readonly store: Store = inject(Store);
  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly userService: UserService = inject(UserService);
  private readonly swalService: SweetAlertService = inject(SweetAlertService);
  private readonly dialogService: DialogService = inject(DialogService);
  private readonly unsubscribe$ = new Subject();

  readonly isAdmin: Signal<boolean> = this.userService.isAdmin;

  previousMonthSummary: BillingSummaryDto | null = null;
  cloudBilling: LocalBillingItem[] = [];
  fixedBilling: LocalBillingItem[] = [];
  dynamicBilling: LocalBillingItem[] = [];

  ngOnInit(): void {
    this.store.dispatch(new GetPreviousMonthSummary());
    this.store.dispatch(new GetPreviousMonthByService());

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

  get allBillings(): BillingItemCategory {
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

    return {
      fixed: fixedMapped,
      dynamic: dynamicMapped,
      cloud: cloudMapped
    };
  }

  openPaymentDialog(item: any): void {
    const paymentPayload = {
      company: item.company,
      orderNumber: item.orderNumber,
      product: item.product,
      amount: item.amount,
      currency: item.currency,
      description: item.description,
      billingDate: item.startDate,
    };

    this.launchDialog(paymentPayload);
  }

  private launchDialog(payload: any): void {
    const { width, height } = this.dialogService.getDialogSize();

    const dialogRef = this.dialog.open(PaymentStripeComponent, {
      width,
      height,
      maxWidth: '100vw',
      autoFocus: false,
      data: payload,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
