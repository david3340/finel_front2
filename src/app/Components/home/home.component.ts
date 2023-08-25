import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/Services/api.service';
import { Product } from '../../shared/models/product';
import { CartService } from '../../shared/Services/cart.service';
import '@angular/localize/init'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  popularProducts:undefined|Product[];
  selectedCategory: string | null = null;

  constructor(private apiService: ApiService, private cartService: CartService) { }

  ngOnInit() {
    this.loadProducts();
    this.apiService.popularProducts().subscribe((data)=>{
      this.popularProducts=data;} )
  }

  loadProducts() {
    this.apiService.getProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
        this.categories = this.extractCategories(products);
      },
      error => {
        console.log('Error:', error);
      }
    );
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  extractCategories(products: Product[]): string[] {
    const uniqueCategories = new Set<string>();
    products.forEach(product => uniqueCategories.add(product.category));
    return Array.from(uniqueCategories);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  isCategorySelected(category: string): boolean {
    return this.selectedCategory === category;
  }

  filterProductsByCategory(): Product[] {
    if (this.selectedCategory) {
      return this.products.filter(product => product.category === this.selectedCategory);
    }
    return this.products;
  }
}










































// import { Component, OnInit } from '@angular/core';
// import { ApiService } from '../../shared/Services/api.service';
// import { Product } from '../../shared/models/product';
// import { CartService } from '../../shared/Services/cart.service';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {
//   products: any[] = [];
//   cartItems: any;
//   //////////////////////////////
//   categories?: string[];
//   selectedCategory: string | null = null;
//   productsByCategory: any;
// ///////////////////////////////
//   constructor(private apiService: ApiService, private cartService: CartService) { }

//   ngOnInit() {
//     this.loadProducts();
//   }

//   loadProducts() {
//     this.apiService.getProducts().subscribe(
//       (products: Product[]) => {        
//         this.products = products.map(product => ({
//           ...product,
//           // image_url: `http://localhost:8000${product.image}`,
          
//           quantity: 0
//         })) ,console.log(this.products);
//         ;
//       },
//       error => {
//         console.log('Error:', error);
//       }
//     );
//   }

//   addToCart(product: Product) {
//     this.cartService.addToCart(product);
//   }

//   removeFromCart(product: any) {
//     if (product.quantity > 0) {
//       product.quantity--;
//     }
//   }

//   getTotalQuantity(): number {
//     return this.products.reduce((total, product) => total + product.quantity, 0);
//   }
// // //////////////////////////////////////////////////////////////
// getProducts() {
//   this.apiService.getProducts().subscribe(products => {
//     this.products = products;
//     this.categories = this.groupProductsByCategory(this.products).map(category => category.category);
//   });
// }

// groupProductsByCategory(products: Product[]) {
//   const groupedProducts: { category: string; products: Product[]; showProducts: boolean }[] = [];

//   products.forEach(product => {
//     const existingCategory = groupedProducts.find(category => category.category === product.category);
//     if (existingCategory) {
//       existingCategory.products.push(product);
//     } else {
//       groupedProducts.push({
//         category: product.category,
//         products: [product],
//         showProducts: false
//       });
//     }
//   });

//   return groupedProducts;
// }

// toggleProducts(category: { category: string; products: Product[]; showProducts: boolean }) {
//   category.showProducts = !category.showProducts;
// }

// selectCategory(category: string): void {
//   this.selectedCategory = category;
// }

// get selectedCategoryProducts(): Product[] {
//   if (this.selectedCategory) {
//     return this.products.filter((product) => product.category === this.selectedCategory);
//   }
//   return this.products;
// }





