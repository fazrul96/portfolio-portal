import { Injectable } from '@angular/core';
import Swal, {SweetAlertResult} from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {
  confirmDelete(itemName: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: 'Are you sure?',
      text: `Delete "${itemName}"? This cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e53935',
      cancelButtonColor: '#9e9e9e',
      confirmButtonText: 'Yes, delete it!',
    });
  }

  confirmDownload(itemName: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: 'Download Confirmation',
      text: `Do you want to download "${itemName}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, download',
      cancelButtonText: 'Cancel',
    });
  }

  showSuccess(title: string, text: string): void {
    Swal.fire(title, text, 'success');
  }

  showError(title: string, text: string): void {
    Swal.fire(title, text, 'error');
  }

  showInfo(title: string, text: string): void {
    Swal.fire(title, text, 'info');
  }
}
