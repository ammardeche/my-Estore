import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private formbuilder = inject(FormBuilder);
  snackbar = inject(MatSnackBar);
  registerForm!: FormGroup;
  acc_token!: string;
  constructor(private authservice: AuthService) {
    this.registerForm = this.formbuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get name() {
    return this.registerForm.get('name')?.value;
  }
  get password() {
    return this.registerForm.get('password')?.value;
  }

  onSubmit() {
    this.authservice.login(this.name, this.password).subscribe({
      next: (res) => {
        this.snackbar.open('Login Successfull', 'Dismiss', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.authservice.router.navigate(['/layout']);
      },
      error: (err) => {
        this.snackbar.open('Login Failed', 'Dismiss', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      },
    });
  }
}
