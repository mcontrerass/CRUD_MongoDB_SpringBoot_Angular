import { Injectable } from '@angular/core';
import { Product } from '../model/product';

const KEY_PROD = 'prod_update';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public setProduct(product: Product): void {
    localStorage.setItem(KEY_PROD, JSON.stringify(product));
  }

  public getProduct(): Product {
    return JSON.parse(localStorage.getItem(KEY_PROD)!);
  }

  public clear(): void {
    localStorage.removeItem(KEY_PROD);
  }
}
