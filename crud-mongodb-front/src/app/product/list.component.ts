import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.list().subscribe(
      data => {
          this.products = data;
      },
      err => {
        this.toast.error(err.error.message, 'Error', { timeOut: 30000, positionClass: 'toast-top-center' });
      }
    );
  }

  onDelete(id: number): void {
    Swal.fire({
      title: 'Eliminar registro!!!',
      text: 'La eliminación no se puede deshacer. ¿Está seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.value) {
        this.productService.delete(id).subscribe(
          data => {
            this.toast.success(data.message, 'OK', { timeOut: 30000, positionClass: 'toast-top-center' });
            this.getProducts();
          },
          err => {
            this.toast.error(err.error.message, 'Error', { timeOut: 30000, positionClass: 'toast-top-center' });
          }
        );
      } else if(result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'El producto no fue eliminado',
          'error'
        )
      }
    });
  }
}
