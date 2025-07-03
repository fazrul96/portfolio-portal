import { Component } from '@angular/core';
import {
    DefaultFlexDirective,
    DefaultLayoutAlignDirective,
    DefaultLayoutDirective,
    DefaultLayoutGapDirective
} from "ng-flex-layout";

@Component({
  selector: 'app-email-mailtrap',
    imports: [
        DefaultFlexDirective,
        DefaultLayoutAlignDirective,
        DefaultLayoutDirective,
        DefaultLayoutGapDirective
    ],
  templateUrl: './email-mailtrap.component.html',
  styleUrl: './email-mailtrap.component.scss'
})
export class EmailMailtrapComponent {

}
