import {Component} from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {MatCard} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {DatePipe} from '@angular/common';
import {BillingHistory, BillingProvider, PAYMENT_METHODS_DATA, Plan} from '../../shared/data/project.data';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';

@Component({
  selector: 'app-billing',
  imports: [
    MatTabGroup,
    MatTab,
    MatCard,
    MatButton,
    MatIcon,
    DatePipe,
    MatIconButton,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader
  ],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss'
})
export class BillingComponent {
  currentPlan: Plan = {
    name: 'Pro Developer Plan',
    description: 'Includes unlimited builds, analytics, and priority support.',
    price: 49,
    cycle: 'month'
  };

  billingHistory: BillingHistory[] = [
    { date: new Date(), amount: 49, method: 'Stripe', status: 'Paid' },
    { date: new Date('2024-06-20'), amount: 49, method: 'Stripe', status: 'Paid' }
  ];

  providers: BillingProvider[] = PAYMENT_METHODS_DATA;

  openChangePlanDialog(): void {
    alert('Open plan selection dialog...');
  }

  payWith(provider: BillingProvider): void {
    alert(`Redirecting to ${provider.name} for payment...`);
  }

  disconnect(provider: BillingProvider): void {
    alert('Open plan selection dialog...');
  }
}
