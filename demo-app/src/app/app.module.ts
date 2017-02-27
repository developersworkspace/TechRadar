// Imports modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Imports components
import { AppComponent } from './app.component';
import { TechRadarCompoment } from './../../../techradar-chart/index';

@NgModule({
  declarations: [
    AppComponent,
    TechRadarCompoment
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
