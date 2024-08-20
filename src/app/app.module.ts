import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BloodDonorsComponent } from './blood-donors/blood-donors.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartComponent } from '../components/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    BloodDonorsComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
