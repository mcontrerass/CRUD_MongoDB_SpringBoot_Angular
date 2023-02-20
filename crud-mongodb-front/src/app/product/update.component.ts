import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit{

  product!: Product;

  constructor(
    private productService: ProductService,
    private toast: ToastrService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  onUpdate(): void {
    this.productService.update(this.product.id, this.product).subscribe(
      data => {
        this.toast.success(data.message, 'OK', { timeOut: 30000, positionClass: 'toast-top-center' });
        this.router.navigate(['']);
      },
      err => {
        this.toast.error(err.error.message, 'Error', { timeOut: 30000, positionClass: 'toast-top-center' });
      }
    );
  }

  getProduct(): void {
    this.product = this.storageService.getProduct();
    this.storageService.clear(); 
  }
}
