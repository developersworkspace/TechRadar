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
import { NewBlipComponent } from './new-blip/new-blip.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { AdminComponent } from './admin/admin.component';


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
    path: 'newblip',
    component: NewBlipComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  }
]);


@NgModule({
  declarations: [
    AppComponent,
    TechRadarCompoment,
    HomeComponent,
    RadarComponent,
    NewBlipComponent,
    LoginComponent,
    NavComponent,
    AdminComponent
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
