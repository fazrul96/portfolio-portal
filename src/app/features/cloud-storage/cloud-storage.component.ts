import { Component } from '@angular/core';
import {
    DefaultFlexDirective,
    DefaultLayoutAlignDirective,
    DefaultLayoutDirective,
    DefaultLayoutGapDirective
} from "ng-flex-layout";

@Component({
  selector: 'app-cloud-storage',
    imports: [
        DefaultFlexDirective,
        DefaultLayoutAlignDirective,
        DefaultLayoutDirective,
        DefaultLayoutGapDirective
    ],
  templateUrl: './cloud-storage.component.html',
  styleUrl: './cloud-storage.component.scss'
})
export class CloudStorageComponent {

}
