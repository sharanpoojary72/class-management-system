// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  role: string = ''; // Initialize with a default value

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Use email validator
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.role = params['role'] || ''; // Ensure role is assigned even if not present
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid && this.role) {
      const { email, password } = this.loginForm.value;

      console.log('Attempting login with:', { email, password, role: this.role });

      this.authService.login(email, password, this.role).subscribe(
        (response) => {
          console.log('Login Response:', response);

          if (response.success) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.role);
            localStorage.setItem('email', email); // Store email in local storage

            console.log('User Role:', response.role);
            let navigatePath = '';

            if (response.role === 'Admin') {
              navigatePath = '/dashboard/admin';
            } else if (response.role === 'Teacher') {
              navigatePath = '/dashboard/teacher';
            } else if (response.role === 'Student') {
              navigatePath = '/dashboard/student';
            } else {
              navigatePath = `/dashboard/home`;
            }

            console.log('Navigating to:', navigatePath);
            this.router.navigate([navigatePath]);
          } else {
            alert('Login failed! Check console for details.');
            console.error('Login failed:', response.error);
          }
        },
        (error) => {
          console.error('Login error:', error);
          alert('Login failed! Check console for details.');
        }
      );
    } else {
      console.log('Form is invalid or role is missing:', this.loginForm.errors);
    }
  }
}