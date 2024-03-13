import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { products } from '../products-list';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ShopService } from 'src/app/shop.service';

@Component({
  selector: 'app-product-template',
  templateUrl: './product-template.component.html',
  styleUrls: ['./product-template.component.css']
})
export class ProductTemplateComponent implements OnInit, OnDestroy, AfterViewInit {
  isViewed = ''
  productList: any
  searchInput = '';
  filteredBrands = []
  filteredType = []
  filteredPrice = {
    min: 0,
    max: 999999
  }
  sub: Subscription
  sub2: Subscription
  sub3: Subscription
  sub4: Subscription
  isEmptyList = false;
  filteredProductList: any[] = [];
  displayedProductCount = 0;
  displayedProductList: any[] = [];
  pageSize: number = 9; 
  currentPageIndex: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor (private router: Router, private productService: ProductService, private shopService: ShopService) {

  }
  ngOnInit(): void {
    this.sub = this.productService.productList.subscribe((data)=>{
      this.productList = data
    })
    this.sub2 = this.productService.searchInput.subscribe((input) =>{
      this.searchInput = input
      this.updateDisplayedProductCount()
      this.applyFilters()
      this.paginator.firstPage()
    })
    this.sub3 = this.productService.filterTrigger.subscribe((filterData) =>{
      this.filteredBrands = filterData.brands
      this.filteredPrice = filterData.price
      this.filteredType = filterData.type
      this.updateDisplayedProductCount()
      this.applyFilters()
      this.paginator.firstPage()
    })
    
    this.updateDisplayedProductCount()
    this.applyFilters()
  }
  
  ngAfterViewInit(): void {
    this.sub4 = this.productService.pageIndex.subscribe((index) =>{
      this.currentPageIndex = index
    })
    setTimeout(() => {
      if (this.paginator) {
        this.paginator.pageIndex = this.currentPageIndex;
        this.currentPageIndex = this.currentPageIndex
      }
      this.updateDisplayedProducts();
    },5);
  }

  onChangePage(event: PageEvent) {
    this.pageSize = event.pageSize
    this.currentPageIndex = event.pageIndex;
    this.updateDisplayedProducts();
  }

  applyFilters() {
    this.filteredProductList = this.productList.filter(product =>
      (this.searchInput === '' || product.title.toLowerCase().includes(this.searchInput)) 
      && (this.filteredType.length === 0 || this.filteredType.includes(product.type))
      && (this.filteredBrands.length === 0 || this.filteredBrands.includes(product.brand)) &&
      (product.price >= this.filteredPrice.min && product.price <= this.filteredPrice.max)
    );
    this.updateDisplayedProducts();
  }

  updateDisplayedProducts() {
    const startIndex = this.currentPageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedProductList = this.filteredProductList.slice(startIndex, endIndex);
  }

  updateDisplayedProductCount() {
    this.displayedProductCount = this.productList.filter(product =>
      (this.searchInput === '' || product.title.toLowerCase().includes(this.searchInput))
      && (this.filteredType.length === 0 || this.filteredType.includes(product.type))
      && (this.filteredBrands.length === 0 || this.filteredBrands.includes(product.brand))
      && (product.price >= this.filteredPrice.min && product.price <= this.filteredPrice.max)
    ).length;
    if (this.displayedProductCount === 0) {
     this.isEmptyList = true
    } else {
      this.isEmptyList = false
    }
  }
    
  onMouse(id) {
    this.isViewed = id
  }
  clearMouse() {
    this.isViewed = ''
  }

  openProduct(product, id) {
    this.productService.pageIndex.next(this.currentPageIndex)
    this.router.navigate(['/products', product.title + id], {
      state: { title: product.title }
    });
  }
  toCart(product) {
    this.shopService.addToCart(product)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
    this.sub2.unsubscribe()
    this.sub3.unsubscribe()
    this.sub4.unsubscribe()
  }
}
