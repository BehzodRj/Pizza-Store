import { Component, OnInit } from '@angular/core';
import { requestsService } from './../all.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  homeData: any = []
  myCartData: any = []
  myCartLength: any = 0

  constructor(private request: requestsService) { }

  ngOnInit() {
    console.log(this.myCartData);

    this.request.getRequest('pizza/').subscribe((response: any) => {
      response.forEach((element: any) => {
        this.homeData.push({ id: element.id, name: element.name, photo: element.photo, price: element.price, order: true })
      });
    }, error => {
      this.request.error(error)
    })
  }

  addToCart(id: number) {
    if (!localStorage.getItem('myCartData')) {
      let homefilterData = this.homeData.filter((res: any) => res.id == id)[0]
      this.myCartData.push({ id: homefilterData.id, name: homefilterData.name, price: homefilterData.price, quantity: 1, quantityPrice: homefilterData.price })
      localStorage.setItem('myCartData', JSON.stringify(this.myCartData))
      homefilterData.result = false
      this.myCartLength = this.myCartData.length
    }
    else if (localStorage.getItem('myCartData')) {
      let localStorageData: any = localStorage.getItem('myCartData')
      this.myCartData = JSON.parse(localStorageData)
      let homefilterData = this.homeData.filter((res: any) => res.id == id)[0]
      this.myCartData.push({ id: homefilterData.id, name: homefilterData.name, price: homefilterData.price, quantity: 1, quantityPrice: homefilterData.price })
      localStorage.setItem('myCartData', JSON.stringify(this.myCartData))
      homefilterData.order = false
      this.myCartLength = this.myCartData?.length
    }
  }

  removeToCart(id: number, idx: number) {
    let localStorageData: any = localStorage.getItem('myCartData')
    this.myCartData = JSON.parse(localStorageData)
    this.myCartData.splice(idx, 1)
    localStorage.setItem('myCartData', JSON.stringify(this.myCartData))
    let homefilterData = this.homeData.filter((res: any) => res.id == id)[0]
    homefilterData.order = true
    this.myCartLength = this.myCartData?.length
  }
}
