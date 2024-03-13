import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit, OnDestroy {
  productList: any;
  sub: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription
  brandList = [];
  typeList = [];
  filteredBrand = [];
  filteredType = [];
  displayChips = 5
  value = {
    min: 0,
    max: 500
  }

  constructor (private productService: ProductService) { }

  ngOnInit(): void {
    this.sub = this.productService.productList.subscribe((data)=>{
      this.productList = data
      this.getMaxPrice()
      this.getBrands()
      this.getType()
    })
    this.initTypes()
    this.getPreviousFilter()
    this.sub2 = this.productService.headerFilterType.subscribe((type) =>{
      if (type) {
        this.filteredType = []
        this.filteredType.push(type)
        this.doFilter()
      }
    })
    this.sub3 = this.productService.clearFilters.subscribe(()=>{
      this.doClear()
    })
    this.sub4 = this.productService.headerFilterBrand.subscribe((brand) =>{
      if (brand) {
        this.filteredBrand = []
        this.filteredBrand.push(brand)
        this.displayChips = 99
        this.doFilter()
      }
    })
  }

  getMaxPrice() {
    let highestPrice = 0;
    for (const product of this.productList) {
      if (product.price > highestPrice) {
        highestPrice = product.price
      }
    }
    if (this.value.max < highestPrice) {
      this.value.max = highestPrice
    }
  }

  getPreviousFilter() {
    if (this.productService.getTemp()) {
      const data = this.productService.getTemp()
      if (data) {
        this.filteredBrand = data.brands
        this.value.min = data.price.min;
        this.value.max = data.price.max
        this.filteredType = data.type
        if (!(data.brands.length === 0)) {
          this.displayChips = 99
        }
      }
    }
    setTimeout(() => {
      this.doFilter()
    });
  }

  expandList() {
    this.displayChips = 99
  }
  getBrands() {
    const uniqueBrands = new Set();
    for (const product of this.productList) {
      uniqueBrands.add(product.brand);
    }
    this.brandList = Array.from(uniqueBrands);
  }

  initTypes() {
    this.filteredType = []
    this.typeList.forEach(item =>{
      this.filteredType.push(item)
    })
  }
  getType() {
    const uniqueTypes= new Set();
    for (const product of this.productList) {
      uniqueTypes.add(product.type);
    }
    this.typeList = Array.from(uniqueTypes);
  }

  doFilter() {
    this.productService.updateFilter(this.filteredBrand, this.value, this.filteredType)
  }

  doClear() {
    this.filteredBrand = []
    this.value = {
      min: 0, 
      max: 500
    }
    this.initTypes()
    this.doFilter()
  }

  selectChip(name) {
    if (this.filteredBrand.includes(name)) {
      const index = this.filteredBrand.indexOf(name)
      if (index !== -1) {
        this.filteredBrand.splice(index, 1)
      }
    } else {
      this.filteredBrand.push(name)
    }
    if (this.displayChips = 5) {
      this.displayChips = 99
    }
  }
  selectCheckbox(name) {
    if (this.filteredType.includes(name)) {
      const index = this.filteredType.indexOf(name)
      if (index !== -1) {
        this.filteredType.splice(index, 1)
      }
    } else {
      this.filteredType.push(name)
    }
  }

  isActiveChip(brand) {
    if (this.filteredBrand.includes(brand)) {
      return true
    } else {
      return false
    }
  }
  isActiveCheckbox(type) {
    if (this.filteredType.includes(type)) {
        return true
      } else {
        return false
      }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
    this.sub2.unsubscribe()
    this.sub3.unsubscribe()
    this.sub4.unsubscribe()
  }
}
