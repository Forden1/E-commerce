import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { Product } from './models/product.model';
import { producerAccessed } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        console.log('Products:', this.products);  // Log the products to the console
      },
      (error) => {
        console.error('Error fetching products:', error);  // Log any errors to the console
      }
    );
  }
}
