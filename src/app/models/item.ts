import { product } from "./product";

export class item {
    product: product;
    quantity: number;
    constructor() {
        this.product = new product,
            this.quantity = 0
    }
}