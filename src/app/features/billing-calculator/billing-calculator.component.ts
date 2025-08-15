import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Color, PieChartModule, ScaleType} from '@swimlane/ngx-charts';
import {MatButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {CurrencyPipe, DecimalPipe, NgClass} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatHint, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {
  MatDatepickerActions,
  MatDatepickerApply,
  MatDatepickerCancel,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
  MatEndDate,
  MatStartDate
} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {FormsModule} from '@angular/forms';
import {BillingResponse, TariffComparisonRow, Tier, UsageBreakdown} from '../../shared/types/billing.type';

@Component({
  selector: 'app-billing-calculator',
  imports: [
    MatButton,
    MatCard,
    MatDatepickerActions,
    MatDatepickerApply,
    MatDatepickerCancel,
    MatDatepickerToggle,
    MatDateRangeInput,
    MatDateRangePicker,
    MatEndDate,
    MatFormField,
    MatHint,
    MatIcon,
    MatInput,
    MatLabel,
    MatStartDate,
    MatSuffix,
    CurrencyPipe,
    DecimalPipe,
    FormsModule,
    NgClass,
    PieChartModule,
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './billing-calculator.component.html',
  styleUrl: './billing-calculator.component.scss'
})
export class BillingCalculatorComponent implements OnInit {
  startDate: Date = new Date('2025-08-03');
  endDate: Date = new Date('2025-09-02');
  totalUsage: number = 622;

  over600Data: UsageBreakdown[] = [];
  under600Data: UsageBreakdown[] = [];
  tariffComparison: TariffComparisonRow[] = [];

  totalSavings: number = 0;
  totalExtra: number = 0;

  chartLabels: string[] = [];
  chartData: any[] = [];
  billingData = [
    { name: 'Paid (RM)', value: 1200 },
    { name: 'Unpaid (RM)', value: 300 },
  ];

  tiers: Tier[] = [];
  estimatedBill: number = 0;
  daysRemaining: number = 0;

  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#007bff', '#dc3545']
  };

  ngOnInit(): void {
    const mockData: BillingResponse = this.getMockBillingData();
    this.loadBillingData(mockData);
    this.calculateBill();
    this.prepareTiers();
    this.calculateDaysRemaining();
  }

  private getMockBillingData(): BillingResponse {
    return {
      startDate: '2025-08-03',
      endDate: '2025-09-02',
      totalUsage: 622,
      over600Data: [
        { category: 'Tenaga', rate: 0.2703, amount: 168.13 },
        { category: 'AFA', rate: 0.0145, amount: -0.20 },
        { category: 'Kapasiti', rate: 0.0455, amount: 28.30 },
        { category: 'Rangkaian', rate: 0.1285, amount: 79.93 },
        { category: 'Peruncitan', rate: 0.16, amount: 0 },
        { category: 'ICT', rate: 0.04, amount: 22.88 }
      ],
      under600Data: [
        { category: 'Tenaga', rate: 0.2703, amount: 162.18 },
        { category: 'AFA', rate: 0, amount: 0 },
        { category: 'Kapasiti', rate: 0.0455, amount: 27.30 },
        { category: 'Rangkaian', rate: 0.1285, amount: 77.10 },
        { category: 'Peruncitan', rate: 0.16, amount: 0 },
        { category: 'ICT', rate: 0.04, amount: 14.58 }
      ],
      tariffComparison: [
        { kwh: 600, oldTariff: 235.27, newTariff: 197.69, diff: -37.58 },
        { kwh: 622, oldTariff: 248.67, newTariff: 266.87, diff: 18.20 }
      ]
    };
  }

  private loadBillingData(data: BillingResponse) {
    this.startDate = new Date(data.startDate);
    this.endDate = new Date(data.endDate);
    this.totalUsage = data.totalUsage;
    this.over600Data = data.over600Data;
    this.under600Data = data.under600Data;
    this.tariffComparison = data.tariffComparison;
  }

  calculateBill(): void {
    const diffs = this.tariffComparison.map(t => t.diff);
    this.totalSavings = this.sumIf(diffs, d => d < 0);
    this.totalExtra = this.sumIf(diffs, d => d > 0);

    this.chartLabels = this.tariffComparison.map(t => `${t.kwh} kWh`);
    this.chartData = this.buildChartData();
    this.billingData = this.under600Data.map(d => ({
      name: d.category,
      value: d.amount
    }));

    this.estimatedBill = this.billingData.reduce((sum, item) => sum + item.value, 0);
  }

  /** Utility: Sum based on condition */
  private sumIf(array: number[], condition: (val: number) => boolean): number {
    return array.filter(condition).reduce((sum, val) => sum + val, 0);
  }

  private buildChartData() {
    return [
      {
        label: 'Old Tariff',
        data: this.tariffComparison.map(t => t.oldTariff),
        borderColor: '#2196f3',
        fill: false
      },
      {
        label: 'New Tariff',
        data: this.tariffComparison.map(t => t.newTariff),
        borderColor: '#4caf50',
        fill: false
      }
    ];
  }

  prepareTiers() {
    const tierRates = [
      { name: '1-200 kWh', rate: 0.218, max: 200, color: '#4caf50' },
      { name: '201-300 kWh', rate: 0.334, max: 300, color: '#ff9800' },
      { name: '301-600 kWh', rate: 0.516, max: 600, color: '#f44336' },
      { name: '>600 kWh', rate: 0.546, max: Infinity, color: '#9c27b0' }
    ];

    let remaining = this.totalUsage;
    let prevMax = 0;

    this.tiers = tierRates.map(t => {
      const limit = Math.min(t.max - prevMax, remaining);
      const used = limit > 0 ? limit : 0;
      remaining -= used;
      prevMax = t.max;
      return {
        name: t.name,
        used,
        rate: t.rate,
        amount: used * t.rate,
        percent: (used / this.totalUsage) * 100,
        color: t.color
      };
    }).filter(t => t.used > 0);
  }

  calculateDaysRemaining() {
    const today = new Date();
    const diff = Math.max(0, this.endDate.getTime() - today.getTime());
    this.daysRemaining = Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  formatLabel(c: any): string {
    return `${c.label}: ${c.value}`;
  }
}
