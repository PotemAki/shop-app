import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'shop-app';

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.getCartFromStorage()
  }
}
