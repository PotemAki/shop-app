import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ProductService } from '../product-page/product.service';
import { Subscription } from 'rxjs';
import { ShopService } from '../shop.service';
import { Router } from '@angular/router';
import { products } from '../product-page/products-list';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  data = products
  isOpen1 = false;
  isOpen2 = false;
  isMouseDown = false;
  sub: Subscription
  cartNumber = 0;
  cartValue = 0;

  constructor(private productService: ProductService, private shopService: ShopService, private router: Router) { }
  @ViewChild('drawer') drawer: MatDrawer | undefined;
  isSidenavOpen: boolean = false;
  

  ngOnInit(): void {
    this.sub = this.productService.closeTab.subscribe(() =>{
      this.isOpen1 = false
    })
    this.shopService.cartElementsNumber.subscribe((num) =>{
      this.cartNumber = num
      this.cartValue = this.shopService.countCartValue()
    })
  }

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.drawer.toggle()
    if (this.isSidenavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  openTab1(num) {
    if (num === 1){
      this.isOpen1 = true
    } else if (num === 2) {
      this.isOpen2 = true
    }
  }
  closeTab1(num) {
    if (num === 1) {
      this.isOpen1 = false;
    } else if (num === 2) {
      this.isOpen2 = false
    }
  }

  openProducts(prop) {
    this.productService.clearFilters.next(true)
    this.router.navigate(['/products'])
    if (prop === 'sidenav') {
      this.toggleSidenav()
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}