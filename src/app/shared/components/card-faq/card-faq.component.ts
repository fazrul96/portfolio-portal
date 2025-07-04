import {Component} from '@angular/core';
import {
  DefaultFlexDirective,
  DefaultLayoutAlignDirective,
  DefaultLayoutDirective,
  DefaultLayoutGapDirective
} from "ng-flex-layout";
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatIcon} from '@angular/material/icon';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-card-faq',
  imports: [
    DefaultFlexDirective,
    DefaultLayoutAlignDirective,
    DefaultLayoutDirective,
    DefaultLayoutGapDirective,
    CdkAccordionModule,
    MatIcon,
    NgClass
  ],
  templateUrl: './card-faq.component.html',
  styleUrl: './card-faq.component.scss',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        opacity: 0,
        padding: '0 16px',
        overflow: 'hidden',
      })),
      state('expanded', style({
        height: '*',
        opacity: 1,
        padding: '16px',
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class CardFaqComponent {
  faqItems = {
    general: [
      { id: 1,
        question: 'Are you available for hire?',
        answer: 'Yes, I am open to work opportunities. Feel free to reach out!' },
      { id: 2,
        question: 'Are you open to collaborations?',
        answer: 'Absolutely! I\'m always open to interesting collaborations.' }
    ],
    services: [
      { id: 1,
        question: 'Do you provide learning materials or recommend resources?',
        answer: 'Yes, I can share useful resources!' },
    ],
    projects: [
      { id: 1,
        question: 'Where can I find examples of your previous work?',
        answer: 'You can check my portfolio or GitHub.' },
      { id: 2,
        question: 'Can I propose a custom project or service?',
        answer: 'Yes, I\'m open to custom project proposals.' },
      { id: 3,
        question: 'How can I stay updated on your latest projects?',
        answer: 'Follow me on LinkedIn or my blog.' }
    ]
  };
}
