import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  myProduct: product;
  id: number = 0;
  productsList: product[] = [];
  constructor(private service: ProductsService,
    private _Activatedroute: ActivatedRoute,
    private _router: Router) {
    this.myProduct = {
      id: 2,
      name: "Headphones",
      price: 249.99,
      url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Listen to stuff!"
    }
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData(): void {
    this._Activatedroute.paramMap.subscribe((params: ParamMap) => {
      console.log(params);
      console.log(params.has('id'));
      let ID = params.get('id') ?? '0';
      this.id = +ID;
      console.log(this.id);
      this.service.getProducts().subscribe(data => {
        this.productsList = data;
        this.myProduct = data.filter(x => x.id === this.id)[0];
      });
      // console.log(this.productsList.length);
      // this.myProduct = this.productsList.find(p => p.id == this.id) ?? new product;
    });
  }
  ngOnDestroy() {
    //this.sub.unsubscribe();
  }

  onBack(): void {
    this._router.navigate(['/']);
  }
  addToCart(product: product): void {
    setTimeout(() => {
      window.alert(product.name + " added to cart");
    }, 500);
  }
}