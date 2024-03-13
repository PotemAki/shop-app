import { Component } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {


  constructor (private _location: Location) { }

  goBackPage(){
    this._location.back();
  }
}
