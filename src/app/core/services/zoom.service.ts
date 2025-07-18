import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZoomService {
  private readonly initialZoom = window.innerWidth <= 600 ? 0.8 : 0.9;
  private readonly zoomSubject = new BehaviorSubject<number>(this.initialZoom);

  zoom$ = this.zoomSubject.asObservable();

  setZoom(value: number): void {
    this.zoomSubject.next(value);
  }

  zoomIn(): void {
    const newZoom: number = this.zoomSubject.value + 0.1;
    this.zoomSubject.next(newZoom);
  }

  zoomOut(): void {
    const newZoom: number = Math.max(0.1, this.zoomSubject.value - 0.1);
    this.zoomSubject.next(newZoom);
  }

  get currentZoom() {
    return this.zoomSubject.value;
  }
}
