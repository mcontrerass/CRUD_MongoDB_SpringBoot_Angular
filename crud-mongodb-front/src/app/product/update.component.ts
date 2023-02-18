import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit{

  id!: number;
  nombre!: string;
  precio!: number;

  constructor(
    private productService: ProductService,
    private toast: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  onUpdate(): void {
    const product = new Product(this.nombre, this.precio);
    this.productService.update(this.id, product).subscribe(
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
    this.id = this.activatedRoute.snapshot.params['id'];
    this.nombre = this.activatedRoute.snapshot.params['nombre'];
    this.precio = this.activatedRoute.snapshot.params['precio'];
  }
}
