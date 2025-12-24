import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { AppTranslateService } from './app-translate.service';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  constructor(private appTranslateService: AppTranslateService) {}

  async danger(title: string, text: string): Promise<boolean> {
    const result = await Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: this.appTranslateService.getValueSync(
        'sweetAlert.danger.cancelButtonText'
      ),
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.appTranslateService.getValueSync(
        'sweetAlert.danger.confirmButtonText'
      ),
    });

    if (result.isConfirmed) {
      await Swal.fire({
        title: this.appTranslateService.getValueSync(
          'sweetAlert.danger.swalTitle'
        ),
        text: this.appTranslateService.getValueSync(
          'sweetAlert.danger.swalText'
        ),
        icon: 'success',
        confirmButtonText: this.appTranslateService.getValueSync(
          'sweetAlert.danger.swalConfirmButtonText'
        ),
      });
      return true;
    }

    return false;
  }
  async warn(title: string, text: string): Promise<boolean> {
    const result = await Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: this.appTranslateService.getValueSync(
        'sweetAlert.warn.cancelButtonText'
      ),
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.appTranslateService.getValueSync(
        'sweetAlert.warn.confirmButtonText'
      ),
    });

    if (result.isConfirmed) {
      await Swal.fire({
        title: this.appTranslateService.getValueSync(
          'sweetAlert.warn.swalTitle'
        ),
        text: this.appTranslateService.getValueSync('sweetAlert.warn.swalText'),
        icon: 'success',
        confirmButtonText: this.appTranslateService.getValueSync(
          'sweetAlert.warn.swalConfirmButtonText'
        ),
      });
      return true;
    }

    return false;
  }
}
