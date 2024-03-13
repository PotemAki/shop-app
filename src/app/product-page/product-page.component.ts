import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';
import { ShopService } from '../shop.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit, OnDestroy {
  enteredSearch = '';
  message = '';
  sub: Subscription
  sub2: Subscription
  panelOpenState = false;

  constructor(private productService: ProductService, private shopService: ShopService, private _location: Location) {  }


  ngOnInit(): void {
    this.sub = this.shopService.maximumCartElement.subscribe((value) =>{
      this.message = value
    })
    this.sub2 = this.productService.clearFilters.subscribe(() =>{
      this.enteredSearch = '';
      this.searchChange()
    })
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  searchChange() {
    this.productService.searchInput.next(this.enteredSearch)
  }
  clear() {
    this.enteredSearch = '';
    this.searchChange()
  }
  goBackPage(){
    this._location.back();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
    this.sub2.unsubscribe()
  }
}
