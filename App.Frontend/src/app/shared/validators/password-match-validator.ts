import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatch(
  passControlName: string = 'newPassword',
  confrimPassControlName: string = 'confirmPassword'
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let passControl = control.get(passControlName);
    let confirmControll = control.get(confrimPassControlName);
    if (!passControl || !confirmControll || !passControl.value || !confirmControll.value)
      return null;

    let ValidationError = { UnmatchedPassword: { pass: passControl.value } };
    return passControl.value === confirmControll.value ? null : ValidationError;
  };
}
