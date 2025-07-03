import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private requestCounter: number = 0;
  private readonly loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  loading$ = this.loadingSubject.asObservable();

  loadingOn(): void {
    this.requestCounter++;
    this.loadingSubject.next(true);
  }

  loadingOff(): void {
    this.requestCounter--;
    this.loadingSubject.next(this.requestCounter > 0);
  }
}
