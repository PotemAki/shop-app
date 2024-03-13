import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product-page/product.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {

  productList: any;
  sub: Subscription;
  reviewCounts = []
  topThree = []
  mostReviews = 0

  constructor (private productService: ProductService, private router: Router) { }


  ngOnInit(): void {
    this.sub = this.productService.productList.subscribe((data) =>{
      this.productList = data
      this.getTopProducts()
    })
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  getTopProducts() {
    let topProducts = [];
    let productsWithReviewCounts = [];
    this.productList.forEach(product => {
      const reviewCount = product.opinions.length;
      productsWithReviewCounts.push({ product, reviewCount });
    });
    productsWithReviewCounts.sort((a, b) => b.reviewCount - a.reviewCount);
    topProducts = productsWithReviewCounts.slice(0, 3).map(item => item.product);
    this.topThree = topProducts;
  }

  openProduct(product) {
    this.router.navigate(['/products', product.title], {
      state: { title: product.title, fromCart: false }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
