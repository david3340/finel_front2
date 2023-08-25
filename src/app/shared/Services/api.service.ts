import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://django-api.hslab.space/product/';

  constructor(private http: HttpClient) {}

  // Get all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }
  getProducts2(id: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}${id}`);
  }
  // Create a new product
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  // Update an existing product
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }

  // Delete a product
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  popularProducts() {
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }

}
