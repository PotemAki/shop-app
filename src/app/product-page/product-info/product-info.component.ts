import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { products } from '../products-list';
import { NgForm } from '@angular/forms';
import {Location} from '@angular/common';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
import { ShopService } from 'src/app/shop.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit, OnDestroy {
  productList: any
  currentTitle = '';
  currentIndex;
  currentProduct: any;
  price = 0
  amount = 1
  increasedPrice = 0
  reducedBy = 15;
  message = '';
  timeOut: any;
  opinionsCount = 0
  selectedImg = ''
  isDesc = false
  totalRate = 0;
  sub: Subscription
  sub2: Subscription
  isFromCart = false;

  constructor(private productService: ProductService, private shopService: ShopService, private route: ActivatedRoute, private router: Router, private _location: Location) 
  {}

  ngOnInit() {

    this.route.params.subscribe((params: Params) =>{
        this.currentTitle = params.id;
        this.sub = this.productService.productList.subscribe((data)=>{
          this.productList = data
        })
        this.sub2 = this.shopService.maximumCartElement.subscribe((value) =>{
          this.message = value
        })
        this.currentTitle = history.state.title;
        this.isFromCart = history.state.fromCart;
        this.applyProduct()
    })
  }

  applyProduct() {

    this.currentProduct = this.findProduct(this.currentTitle)
    this.price = this.currentProduct.price
    this.increasedPrice = Math.ceil(this.price * (1 + this.reducedBy / 100));
    this.sumRating()
    this.countOpinions()
  }
  
  findProduct(name) {
    if (!this.productList) {
      return
    }
    for (let i = 0; i < this.productList.length; i++) {
      if (this.productList[i].title === name) {
        this.currentIndex = i
        return this.productList[i];
      }
    }
  }

  sumRating() {
    let opinions = this.currentProduct.opinions
    let totalRating = 0
    if (!opinions) {
      return
    }
    for (let i=0; i < opinions.length; i++ ) {
      totalRating += opinions[i].rating 
    }
    const avgRating = totalRating / opinions.length
    if (isNaN(avgRating)){
      this.totalRate = 0
    } else {
      this.totalRate = parseFloat(avgRating.toFixed(1));
    }
  }

  countOpinions() {
    if (this.currentProduct && this.currentProduct.opinions && Array.isArray(this.currentProduct.opinions)) {
      this.opinionsCount = this.currentProduct.opinions.length
    } else {
      this.opinionsCount = 0 
    }
  }
  openImagePopup(img) {
    this.selectedImg = img
  }
  closeImagePopup() {
    this.selectedImg = ''
  }
  
  plusAmount() {
    if (this.amount < 9) {
      this.amount++
    } else {
      this.message = 'This is maximum you can add to cart!'
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.message = '';
      }, 1000);
      return;
    }
    this.price = this.currentProduct.price * this.amount
    
  }
  minusAmount() {
    if (this.amount > 1) {
      this.amount--
    }
    this.price = this.currentProduct.price * this.amount
  }
  addToCart(product) {
    const currentCartAmount = +this.shopService.countElements(product)
    if ((this.amount + currentCartAmount) <= 9) {
      for (let i = 0; i < this.amount; i++) {
        this.shopService.addToCart(product)
      }
    } else {
      this.message = `You can't add more of this product!`
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.message = '';
      }, 1000);
      return;
    }
  }

  @ViewChild('reviews', { read: ElementRef }) reviews: ElementRef;
  scrollReview(){
    this.isDesc = false
    this.reviews.nativeElement.scrollIntoView({behavior: 'smooth'});
  }

  toDesc(){
    this.isDesc = true
  }
  toReview() {
    this.isDesc = false
  }

  onSubmit(f: NgForm) {
    if (f.valid) {
      const newComment = {
        name: f.value.name,
        comment: f.value.comment,
        rating: +f.value.rate
      }
      products[this.currentIndex].opinions.push(newComment)
      f.reset()
      this.applyProduct()
      this.productService.productList.next(products)
    }
  }
  goBack(isFromCart) {
    if (isFromCart) {
      this.router.navigate(['/cart'])
    } else {
      this.router.navigate(['/products'])
    }
  }
  goBackPage(){
    this._location.back();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
    this.sub2.unsubscribe()
  }
  
}
