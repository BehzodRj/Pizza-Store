import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bassket-page',
  templateUrl: './bassket-page.component.html',
  styleUrls: ['./bassket-page.component.scss']
})
export class BassketPageComponent implements OnInit {
  deliveryNumber = 15
  allPrice = 0
  cartData: any = []

  constructor() { }

  ngOnInit() {
    let localStorageData: any = localStorage.getItem('myCartData')
    this.cartData = JSON.parse(localStorageData)
    this.cartData.forEach((element: any) => {
      this.allPrice = this.allPrice += element.quantityPrice
    });
    this.allPrice = this.allPrice += this.deliveryNumber
  }

  addQuantity(id: number, price: number) {
    let quantity = 1
    let cart = this.cartData.filter((res: any) => res.id == id)[0]
    cart.quantity = cart.quantity += quantity
    cart.quantityPrice = cart.quantityPrice += price

    this.allPrice = 0
    this.cartData.forEach((element: any) => {
      this.allPrice = this.allPrice += element.quantityPrice
    });
    this.allPrice = this.allPrice += this.deliveryNumber
  }

  removeQuantity(id: number, price: number) {
    let quantity = 1
    let cart = this.cartData.filter((res: any) => res.id == id)[0]

    if (cart.quantity < 2) {
      cart.quantity = 1
      cart.quantityPrice = price
    }
    else {
      cart.quantity = cart.quantity -= quantity
      cart.quantityPrice = cart.quantityPrice -= price

      this.allPrice = 0
      this.cartData.forEach((element: any) => {
        this.allPrice = this.allPrice += element.quantityPrice
      });
      this.allPrice = this.allPrice += this.deliveryNumber
    }
  }

  deleteCart(idx: number) {
    let localStorageData: any = localStorage.getItem('myCartData')
    let cartData = JSON.parse(localStorageData)
    cartData.splice(idx, 1)
    localStorage.setItem('myCartData', JSON.stringify(cartData))

    this.cartData.splice(idx, 1)
    this.allPrice = 0
    this.cartData.forEach((element: any) => {
      this.allPrice = this.allPrice += element.quantityPrice
    });
    this.allPrice = this.allPrice += this.deliveryNumber
  }

  payment() {
    console.log(this.cartData);
    
  }

}
