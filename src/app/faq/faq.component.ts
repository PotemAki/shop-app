import { Component, OnInit } from '@angular/core';
import { customerServiceFaq, privacySecurityFaq, productFaq, promotionsFaq, shipmentfaq } from './faq';
import {Location} from '@angular/common';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  shipment: any;
  product: any;
  service: any;
  promotions: any;
  privacy: any;
  loopElement: any;
  isOpen = 'shipment'

  constructor (private _location: Location) {

  }

  ngOnInit(): void {
    this.loopElement = shipmentfaq

    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  openTab(tag) {
    this.isOpen = tag
    if (tag === 'shipment') {
      this.loopElement = shipmentfaq
    } else if (tag === 'product') {
      this.loopElement = productFaq
    } else if (tag === 'service') {
      this.loopElement = customerServiceFaq
    } else if (tag === 'promotions') {
      this.loopElement = promotionsFaq
    } else if (tag === 'privacy') {
      this.loopElement = privacySecurityFaq
    }
  }
  goBackPage(){
    this._location.back();
  }
}
