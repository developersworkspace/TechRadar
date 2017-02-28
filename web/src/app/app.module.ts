// Imports modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Imports Components
import { AppComponent } from './app.component';
import { TechRadarCompoment } from 'techradar-chart';
import { HomeComponent } from './home/home.component';
import { RadarComponent } from './radar/radar.component';
import { SuggestComponent } from './suggest/suggest.component';
import { LoginComponent } from './login/login.component';


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
  },
  {
    path: 'login',
    component: LoginComponent
  }
]);


@NgModule({
  declarations: [
    AppComponent,
    TechRadarCompoment,
    HomeComponent,
    RadarComponent,
    SuggestComponent,
    LoginComponent
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
