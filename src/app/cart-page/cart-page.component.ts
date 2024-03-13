import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { shipmentfaq } from '../faq/faq';
import {Location} from '@angular/common';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit, OnDestroy{
  cartList: any = []
  duplicateCounts: { [title: string]: number } = {};
  message = ''
  cartValue = 0;
  cartElements = 0;
  panelOpenState = false
  shipStatus = 'DPD (+ $5)'
  shipCost = 5
  sub: Subscription
  sub2: Subscription
  fqaData: any;

  constructor(private shopService: ShopService, private router: Router, private _location: Location) { }

  ngOnInit(): void {
    this.sub = this.shopService.cartElementsNumber.subscribe((value) =>{
      this.cartList = this.shopService.cartList
      this.cartElements = value
      this.sortProducts()
      this.cartValue = this.shopService.countCartValue()
    })
    this.sub2 = this.shopService.maximumCartElement.subscribe((value) =>{
      this.message = value
    })
    this.sortProducts()
    this.fqaData = shipmentfaq
  }
  goBackPage(){
    this._location.back();
  }
  
  sortProducts(): void {
    this.cartList.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      } else if (a.title > b.title) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  isDuplicate(product: any, currentIndex: number) {
    for (let i = 0; i < currentIndex; i++) {
      if (this.cartList[i].title === product.title) {
        return true;
      }
    }
    return false;
  }
  getDuplicateCount(product: any): number {
    let count = 0;
    for (let i = 0; i < this.cartList.length; i++) {
      if (this.cartList[i].title === product.title) {
        count++;
      }
    }
    return count;
  }
  isEmpty() {
    return Object.keys(this.cartList).length === 0;
  }
  plusAmount(product, amount) {
    this.shopService.addToCart(product)
  }
  minusAmount(product) {
    this.shopService.removeFromCart(product)
  }
  clearCart() {
    this.shopService.clearStorage()

  }
  totalCartValue() {
    return this.shopService.countCartValue()
  }
  totalPrice() {
    let price = this.shopService.countCartValue()
    if (price === 0) {
      return 0
    }
    if (price > 300) {
      return price
    } else {
      return price + this.shipCost
    }
  }
  pickOption(panel: MatExpansionPanel, num) {
    if (num === 1) {
      this.shipStatus = 'DPD (+ $5)'
      this.shipCost = 5
    } else if (num === 2) {
      this.shipStatus = 'UPS (+ $8)'
      this.shipCost = 8
    } else if (num === 3) {
      this.shipStatus = 'Self-Pickup (+ $0)'
      this.shipCost = 0
    }
    if (panel) {
      panel.close()
    }
  }

  openProduct(product) {
    this.router.navigate(['/products', product.title], {
      state: { title: product.title, fromCart: true }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
    this.sub2.unsubscribe()
  }
  
}
