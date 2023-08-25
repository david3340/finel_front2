import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/models/product';
import { ApiService } from '../../shared/Services/api.service';
import { CartService } from '../../shared/Services/cart.service';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: any ;
  productQuantity: number = 1;
  removeCart = false;
  cartData: any | undefined; // Adjust the type as per your cart item model/interface

  constructor(
    private activeRoute: ActivatedRoute,
    private apiService: ApiService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('id');
    console.warn(productId);
    if (productId) {
      
      const productIdNum = parseInt(productId, 10); // Convert productId to number
      this.apiService.getProducts2(productId).subscribe((result) => {
        console.log(result);
        
        this.productData = result; // Assuming the API returns an array with a single product


        // Check if the product is already in the cart
        this.cartData = this.cartService.getCartItemByProductId(productIdNum);
        this.removeCart = !!this.cartData;
      });
    }
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      this.cartService.addToCart(this.productData);

      // Update the cartData and removeCart flag
      this.cartData = this.cartService.getCartItemByProductId(this.productData.id);
      this.removeCart = true;
    }
  }

  removeToCart(productId: number) {
    this.cartService.removeFromCartByProductId(productId);

    // Update the cartData and removeCart flag
    this.cartData = this.cartService.getCartItemByProductId(productId);
    this.removeCart = !!this.cartData;
  }
}
