import {inject, Injectable} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatDialog} from '@angular/material/dialog';
import {ComponentType} from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

  showDialog<T>(
    component: ComponentType<T>,
    delayMs: number = 0,
    data: any = null
  ): void {
    setTimeout((): void => {
      const size: { width: string, height: string} = this.getDialogSize();
      this.dialog.open(component, {
        width: size.width,
        height: size.height,
        maxWidth: size.width,
        autoFocus: false,
        data,
      });
    }, delayMs);
  }

  getDialogSize(): { width: string; height: string } {
    if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
      return { width: '90vw', height: 'auto' };
    } else if (this.breakpointObserver.isMatched(Breakpoints.Tablet)) {
      return { width: '70vw', height: 'auto' };
    } else if (this.breakpointObserver.isMatched(Breakpoints.Web)) {
      return { width: '43vw', height: 'auto' };
    }
    return { width: '50vw', height: '90vh' };
  }

  getDialogSizeCardSideNavResume(): { width: string; height: string } {
    if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
      return {width: '100vw', height: '75vh'};
    } else if (this.breakpointObserver.isMatched(Breakpoints.Web)) {
      return {width: '35vw', height: '80vh'};
    }
    return {width: '50vw', height: '90vh'};
  }
}
