import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {COMMON_CONSTANTS} from '../../constants/common.constants';

@Component({
  selector: 'app-not-found',
  imports: [
    RouterLink
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent implements OnInit {
  private readonly router: Router = inject(Router);
  pageName: string = COMMON_CONSTANTS.EMPTY_STRING;

  ngOnInit(): void {
    const path: string = this.router.url;
    this.pageName = path.split('/').pop() ?? 'this page';
  }
}
