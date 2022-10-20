import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { item } from 'src/app/models/item';
import { product } from 'src/app/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() myProduct: product;
  @Output() addProduct: EventEmitter<any> = new EventEmitter();
  constructor() {
    this.myProduct = {
      id: 0,
      name: '',
      price: 0,
      url: '',
      description: ''
    }
  }

  ngOnInit(): void {
  }
  addToCart(product: product, quantity: number): void {
    let item: item = {
      product: product,
      quantity: quantity
    }
    this.addProduct.emit(item);

  }

}
