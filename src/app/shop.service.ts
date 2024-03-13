import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ShopService {
  toCart = new Subject<any>()
  cartList: any = []
  cartElementsNumber = new BehaviorSubject<number>(0)
  maximumCartElement = new BehaviorSubject<string>('')
  timeOut: any;

  addToCart(data) {
    const elementsWithTitle = this.cartList.filter(item => item.title === data.title);
    if (elementsWithTitle.length < 9) {
      this.cartList.push(data);
      this.saveCartToStorage()
      this.countCartElements()
    } else {
      this.maximumCartElement.next(`You can't add more of this product!`)
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.maximumCartElement.next(``)
      }, 1000);
    }
  }

  countElements(data) {
    const elementsWithTitle = this.cartList.filter(item => item.title === data.title);
    return elementsWithTitle.length
  }

  saveCartToStorage() {
    const shoesDataString = JSON.stringify(this.cartList);
    localStorage.setItem('cartData', shoesDataString);
  }
  getCartFromStorage() {
    if (localStorage.getItem('cartData')) {
      const storedShoesDataString = localStorage.getItem('cartData')
      const storedShoesData = JSON.parse(storedShoesDataString);
      this.cartList = storedShoesData
    }
    this.countCartElements()
  }

  countCartElements() {
    const numberOfElements = Object.keys(this.cartList).length;
    this.cartElementsNumber.next(numberOfElements);
  }

  countCartValue() {
    if (this.cartList) {
      let value = 0;
      for (let element of this.cartList) {
        value += element.price
      }
      return value
    }
  }

  removeFromCart(element) {
    const index = this.cartList.findIndex(product => product.title === element.title);
    
    if (index !== -1) {
      this.cartList.splice(index, 1);
      this.saveCartToStorage()
      this.countCartElements()
    }
  }

  clearStorage() {
    localStorage.removeItem('cartData');
    this.cartList = []
    this.saveCartToStorage()
    this.countCartElements()
  }
}