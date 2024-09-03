import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-productform',
  templateUrl: './productform.component.html',
  styleUrls: ['./productform.component.css']
})
export class ProductformComponent {
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private productService: ProductService, private router: Router) { }

  addProduct(form: any): void {
    if (form.valid) {
      const product: Product = form.value;
      this.productService.addProduct(product).subscribe({
        next: () => {
          this.successMessage = 'Product added successfully!';
          this.errorMessage = ''; // Clear error message
          form.reset(); // Reset form
          
        },
        error: (err) => {
          console.error('Error:', err); // Log error for debugging
          this.errorMessage = 'Failed to add product. Please try again.';
          this.successMessage = ''; // Clear success message
        }
      });
    }
  }
}
