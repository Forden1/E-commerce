import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service.service'; // Adjust the path as necessary
import { Router } from '@angular/router'; // For navigation after signup

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (this.name && this.email && this.password) {
      console.log('Name:', this.name);
      console.log('Email:', this.email);
      console.log('Password:', this.password);

      // Call the signup method from the AuthService
      this.authService.register(this.name, this.email, this.password).subscribe(
        response => {
          this.successMessage = 'Registration successful! Please log in.';
          this.errorMessage = '';
          // Optionally navigate to the login page or dashboard
          this.router.navigate(['/login']);
        },
        error => {
          this.errorMessage = 'Registration failed. Please try again.';
          this.successMessage = '';
        }
      );
    } else {
      this.errorMessage = 'Please fill in all fields.';
      this.successMessage = '';
    }
  }
}
