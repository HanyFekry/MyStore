import { Component, OnInit } from '@angular/core';
import { item } from 'src/app/models/item';
import { product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productsList: product[] = [];
  constructor(private service: ProductsService, private c_service: CartService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts(): void {
    this.service.getProducts().subscribe(data => {
      this.productsList = data;
    });
  }
  addToCart(product: product) {
    setTimeout(() => {
      window.alert(product.name + " added to cart");
    }, 500);
  }
  addItemToCart(item: item): void {
    // let payload = {
    //   productId: id,
    //   quantity,
    // };
    this.c_service.addToCart(item.product, item.quantity);
    //notify the user that item added to cart
    alert(item.product.name + ' added to cart');
  }
}
