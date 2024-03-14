import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/product-page/product.service';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.css']
})
export class ProductsHeaderComponent implements OnInit, OnDestroy {
  productList: any;
  sub: Subscription;
  isOpen1 = false;
  openedType = '';
  isMouseDown = false;
  firstTimer = true;
  typeList = []
  brandList = []
  elementsCount = 0
  highestRatedProduct;
  highestRating = 0;

  constructor (private productService: ProductService, private router: Router) { }
  
  ngOnInit(): void {
    this.sub = this.productService.productList.subscribe((data)=>{
      this.productList = data
      this.getType()
      this.getBrands()
      this.getTopProduct()
    })
    this.countElements()
  }

  openTopProduct() {
    this.router.navigate(['/products', this.highestRatedProduct.title], {
      state: { title: this.highestRatedProduct.title, fromCart: false }
    });
  }

  getTopProduct() {
    this.highestRating = 0;
    this.productList.forEach(product =>{
      const avgRating = parseFloat(this.calcAvgRating(product.opinions));
      if (avgRating > this.highestRating) {
        this.highestRating = avgRating;
        this.highestRatedProduct = product
      }
    })
  }

  calcAvgRating(opinions) {
    const totalRatings = opinions.reduce((sum, opinion) => sum + opinion.rating, 0);
    return (totalRatings / opinions.length).toFixed(1)
  }

  countElements() {
    for (let element of this.productList) {
      if (element) {
        ++this.elementsCount
      }
    }
  }

  getBrands() {
    const uniqueBrands = new Set();
    const filteredData = this.productList.filter(product => product.type === this.openedType);
    for (const product of filteredData) {
      uniqueBrands.add(product.brand);
    }
    this.brandList = Array.from(uniqueBrands);
  }
  getType() {
    const uniqueTypes= new Set();
    for (const product of this.productList) {
      uniqueTypes.add(product.type);
    }
    this.typeList = Array.from(uniqueTypes);
  }

  openTab1(type) {
    this.isOpen1 = true
    this.openedType = type
    this.firstTimer = false;
    this.getBrands()
  }
  openTab2() {
    this.isOpen1 = true
  }
  closeTab1() {
    this.isOpen1 = false;
  }
  closeTab2() {
    this.isOpen1 = false;
    this.openedType = '';
  }
  openProducts() {
    this.productService.closeTab.next(true)
    this.productService.clearFilters.next(true)
    this.router.navigate(['/products'])
  }
  openType(type) {
    this.productService.closeTab.next(true)
    this.productService.headerFilterType.next(type)
    this.router.navigate(['/products'])
  }
  openBrand(brand) {
    this.productService.headerFilterType.next(this.openedType)
    this.productService.closeTab.next(true)
    this.productService.headerFilterBrand.next(brand)
    setTimeout(()=>{
      this.router.navigate(['/products'])
    })
    
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
