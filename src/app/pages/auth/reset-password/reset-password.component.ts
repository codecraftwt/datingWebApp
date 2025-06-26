import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

function passwordMatchValidator(form: FormGroup) {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
}
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  hide = signal(true);
  hideConfirm = signal(true);
  resetPasswordForm = {} as FormGroup;
  emailForm = {} as FormGroup;
  isReset: boolean = false;
  private _fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private readonly _snackbar = inject(MatSnackBar);

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.emailForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.resetPasswordForm = this._fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, { validators: passwordMatchValidator })
  }


  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  clickCFEvent(event: MouseEvent) {
    this.hideConfirm.set(!this.hideConfirm());
    event.stopPropagation();
  }

  handleEmailSubmit() {
    if (this.emailForm.invalid) return;
    if (this.emailForm.valid) {
      try {
        let data = this.emailForm.get('email')?.value;
        const email = { email: data };
        this.authService.checkIsEmail(email).subscribe((res) => {
          if (res.success === true) {
            this._snackbar.open(res.message, 'success');
            this.isReset = true;
          }
        })
      } catch (error) {
        console.error(error);
      }
    }
  }

  handleReset() {
    if (this.resetPasswordForm.invalid) return;
    if (this.resetPasswordForm.valid) {
      try {
        let data = this.resetPasswordForm.value;
        const payload = {
          email: this.emailForm.get('email')?.value,
          newPassword: data.password,
          confirmPassword: data.confirmPassword
        };
        
        this.authService.resetPassword(payload).subscribe((res) => {
          if (res.success === true) {
            this.router.navigate(['/login']);
            this._snackbar.open(res.message, 'success');
          }
        })
      } catch (error) {
        console.error(error);
      }
    }
  }
}
