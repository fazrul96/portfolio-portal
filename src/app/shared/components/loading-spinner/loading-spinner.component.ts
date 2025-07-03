import {AsyncPipe} from '@angular/common';
import {Component, inject} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {Observable} from 'rxjs';
import {LoadingService} from '../../../core/services/loading.service';

@Component({
  selector: 'app-loading-spinner',
  imports: [
    AsyncPipe,
    MatProgressSpinnerModule
  ],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {
  loading$!: Observable<boolean>;

  private readonly loadingService = inject(LoadingService);

  constructor() {
    this.loading$ = this.loadingService.loading$;
  }
}
