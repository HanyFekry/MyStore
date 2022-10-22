import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { item } from 'src/app/models/item';
import { CartService } from 'src/app/services/cart.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: item[] = [];
  totalPrice: number = 0;
  name: string = '';
  address: string = '';
  cardNo: number = 0;

  constructor(private c_service: CartService, private router: Router) { }
  getCartItems() {
    this.items = this.c_service.getItems();
    this.totalPrice = this.c_service.calcTotalPrice();
  }
  increaseQty(item: item) {
    item.quantity += 1;
    this.c_service.addQty(item);
    this.totalPrice = this.c_service.calcTotalPrice();
  }
  decreaseQty(item: item) {
    if (item.quantity >= 2) {
      item.quantity -= 1;
      this.c_service.addQty(item);
      this.totalPrice = this.c_service.calcTotalPrice();
    }
  }
  removeItem(item: item) {
    this.c_service.deleteItem(item);
    this.totalPrice = this.c_service.calcTotalPrice();
    this.getCartItems();
    //notify the user that item added to cart
    alert(item.product.name + ' removed from cart');
  }
  onSubmit() {
    let model = {
      name: this.name,
      address: this.address,
      cardNo: this.cardNo
    }
    this.c_service.clearCart();
    this.router.navigateByUrl('/confirm');
  }
  ngOnInit(): void {
    //   this.getCart();
    this.getCartItems()

  }
  nameChanged(arg: any) {
    console.log(arg);
  }
  cardNoChanged(arg: any) {
    console.log(arg);
  }
}
