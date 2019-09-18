import { FormGroup } from '@angular/forms';

export const confirmPasswordValidator = (form: FormGroup) => {
  const { password, confirmPassword } = form.controls;

  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({
      match: 'Passwords don`t match!'
    });
  }

  return;
};
