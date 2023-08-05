import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  routerData: any
  routerIf = true
  
  @Input() myCartData: any

  constructor(public router: ActivatedRoute) { }

  ngOnInit() {
    this.routerData = this.router.snapshot.routeConfig?.path
    if(this.routerData == 'cart' || this.routerData == 'admin') {
      this.routerIf = false
    }
    let localStorageData: any = localStorage.getItem('myCartData')
    this.myCartData = JSON.parse(localStorageData)?.length
    
  }

}
