import { Injectable } from '@angular/core';
import { products } from './products-list';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productList = new BehaviorSubject<object>(products)
  searchInput = new Subject<string>()
  filterTrigger = new Subject<any>()
  clearFilters = new Subject<any>()
  pageIndex = new BehaviorSubject<number>(0)
  closeTab = new Subject<any>()
  headerFilterType = new Subject<any>()
  headerFilterBrand = new Subject<any>()
  tempData: any;

  updateFilter(brands: any, price:any, type: any ) {
    const filterData = {
      brands: brands.slice(),
      price: {...price },
      type: type.slice()
    }
    this.tempData = filterData
    
    this.filterTrigger.next(filterData)
  }

  getTemp() {
    return this.tempData
  }
}