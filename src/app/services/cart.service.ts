import { Injectable } from '@angular/core';
import { product } from '../models/product';
import { item as Item } from '../models/item';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
//import { StorageService } from '../services/storage.service';


let itemsInCart = [];
let cart = [];
//console.log("itemsInCart: ", itemsInCart);
@Injectable({
  providedIn: 'root'
})
export class CartService {

  product: product = new product();
  items: Item = new Item();
  subject = new Subject<any>();
  cartKey: string = 'cart';
  private _myData$ = new BehaviorSubject<Item>(new Item);
  public myData$ = this._myData$.asObservable()
  constructor(private http: HttpClient) { }

  addToCart(product: product, quantity: number) {
    let local_storage;
    let exists: boolean = false;
    let itemsInCart = []
    this.items = {
      product: product,
      quantity: quantity,
    }
    if (localStorage.getItem(this.cartKey) == null) {
      local_storage = [];
      console.log("cart is empty");
      itemsInCart.push(this.items);
      localStorage.setItem(this.cartKey, JSON.stringify(itemsInCart));
      //this.subject.next('changed');
      console.log('Pushed first Item: ', JSON.stringify(itemsInCart));
    }
    else {
      local_storage = JSON.parse(localStorage.getItem(this.cartKey) ?? '');
      //console.log("LOCAL STORAGE HAS ITEMS", JSON.parse(localStorage.getItem(this.cartKey) ?? ''));
      for (var i in local_storage) {
        console.log(local_storage[i].product.id);
        if (this.items.product.id == local_storage[i].product.id) {
          local_storage[i].quantity += 1;
          console.log("Quantity for " + i + " : " + local_storage[i].quantity);
          console.log('same product! index is ', i);
          exists = true;
          break;
        }
      }
    }
    if (!exists) {
      local_storage.push(this.items);
    }
    // local_storage.forEach( (item: Item)=> {
    //   itemsInCart.push(item);
    // })
    localStorage.setItem(this.cartKey, JSON.stringify(local_storage));
    this.subject.next('changed');

  }
  getItems() {
    console.log("Cart: ", JSON.parse(localStorage.getItem(this.cartKey) ?? ''));
    //if (!localStorage.getItem(this.cartKey)) {
    return this.items = JSON.parse(localStorage.getItem(this.cartKey) ?? '');
    //}
    //return  Item[]
  }
  deleteItem(item: Item) {
    item = item;
    console.log("Deleting : ", item);
    let shopping_cart;
    let index;
    shopping_cart = JSON.parse(localStorage.getItem(this.cartKey) ?? '');
    for (let i in shopping_cart) {
      if (item.product.name == shopping_cart[i].product.name) {
        index = i;
        console.log(index);
      }

    }
    shopping_cart.splice(index, 1);
    console.log("shopping_cart ", shopping_cart);
    localStorage.setItem(this.cartKey, JSON.stringify(shopping_cart));
    this.subject.next('changed');

  }
  addQty(item: Item) {
    item = item;
    let shopping_cart;
    shopping_cart = JSON.parse(localStorage.getItem(this.cartKey) ?? '');
    for (let i in shopping_cart) {
      if (item.product.id == shopping_cart[i].product.id) {
        shopping_cart[i].quantity = item.quantity;
        break;
      }
      //return item;
    }
    localStorage.setItem(this.cartKey, JSON.stringify(shopping_cart));
    this.subject.next('changed');

  }
  calcTotalPrice(): number {
    let totalPrice = 0;
    let shopping_cart;
    shopping_cart = JSON.parse(localStorage.getItem(this.cartKey) ?? '');
    for (let i in shopping_cart) {
      totalPrice += shopping_cart[i].quantity * shopping_cart[i].product.price;
    }
    return totalPrice;
  }
  numberOfItems() {
    let itemsInCart = JSON.parse(localStorage.getItem(this.cartKey) ?? '');
    return itemsInCart.length;
  }
  clearCart() {
    localStorage.clear();
  }
}
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { environment } from '../../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {

//   constructor(private http: HttpClient) { }
//   addToCart(payload: any) {
//     return this.http.post(`${environment.baseURL}/cart`, payload);
//   }
//   getCartItems() {
//     return this.http.get(`${environment.baseURL}/cart`);
//   }
//   increaseQty(payload: any) {
//     return this.http.post(`${environment.baseURL}/cart`, payload);
//   }
//   emptyCart() {
//     return this.http.delete(`${environment.baseURL}/cart/empty-cart`);
//   }
// }
