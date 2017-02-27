import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TechRadarCompoment } from 'techradar-chart';
import { HomeComponent } from './home/home.component';
import { RadarComponent } from './radar/radar.component';
import { SuggestComponent } from './suggest/suggest.component';


let router = RouterModule.forRoot([
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'radar',
    component: RadarComponent
  },
  {
    path: 'suggest',
    component: SuggestComponent
  }
]);


@NgModule({
  declarations: [
    AppComponent,
    TechRadarCompoment,
    HomeComponent,
    RadarComponent,
    SuggestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    router
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
