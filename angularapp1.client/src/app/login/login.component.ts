import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service.service'; // Adjust the path as necessary
import { Router } from '@angular/router'; // For navigation after login

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // To display error messages
  successMessage: string = ''; // To display success messages

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    if (this.email.trim() === '' || this.password.trim() === '') {
      this.errorMessage = 'Email and Password are required';
      return;
    }

    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Login successful, response:', response);
        if (response.token) {
          this.authService.storeToken(response.token); // Correct method
          this.successMessage = 'Login successful!';
          this.errorMessage = '';
          this.router.navigate(['/dashboard']);
        } else {
          console.error('Token not received in response');
          this.errorMessage = 'Login failed. Please try again.';
        }
      },
      error => {
        console.error('Login failed', error);
        this.errorMessage = 'Login failed. Please check your credentials and try again.';
        this.successMessage = '';
      }
    );
  }
}
