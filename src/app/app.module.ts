import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CountryDetailComponent } from './pages/country-detail/country-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as fr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, CountryDetailComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgxChartsModule, BrowserAnimationsModule, NgxSpinnerModule, SharedModule],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR'}],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
