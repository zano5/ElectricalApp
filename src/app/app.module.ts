import { TabsPage } from './page/tabs/tabs.page';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyB83CuKn-QSuzzxN6X8l2L5UKqfeb2NjvA",
  authDomain: "eletrical-engineer-cms.firebaseapp.com",
  databaseURL: "https://eletrical-engineer-cms.firebaseio.com",
  projectId: "eletrical-engineer-cms",
  storageBucket: "eletrical-engineer-cms.appspot.com",
  messagingSenderId: "931661674739",
  appId: "1:931661674739:web:65e43541f406b1822c1f86",
  measurementId: "G-99GQV7XQHK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

@NgModule({
  declarations: [AppComponent, TabsPage],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule, MatExpansionModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
