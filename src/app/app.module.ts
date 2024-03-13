import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductTemplateComponent } from './product-page/product-template/product-template.component';
import { ProductInfoComponent } from './product-page/product-info/product-info.component';
import { FormsModule } from '@angular/forms';
import { ProductFilterComponent } from './product-page/product-filter/product-filter.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductsHeaderComponent } from './header/products-header/products-header.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { FooterComponent } from './footer/footer.component';
import { FaqComponent } from './faq/faq.component';
import { ContactHeaderComponent } from './header/contact-header/contact-header.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductPageComponent,
    ProductTemplateComponent,
    ProductInfoComponent,
    ProductFilterComponent,
    ProductsHeaderComponent,
    CartPageComponent,
    MainPageComponent,
    FooterComponent,
    FaqComponent,
    ContactHeaderComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatDividerModule,
    MatChipsModule,
    MatSliderModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
