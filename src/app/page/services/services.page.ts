import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from "firebase";

import { LoadingController } from '@ionic/angular';
import { AuthServiceService } from 'src/app/Service/auth-service.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
  ArrayServices;
  imagePath="assets/images/wired.jpg";

  constructor(private router: Router,
    public loadingController: LoadingController,
    public ViewServices: AuthServiceService) { }

  ngOnInit() {
    this.loadingServices();
  }


  detail(){

    this.router.navigateByUrl('service-detail');

  }

  async loadingServices() {
    const loading = await this.loadingController.create({
      message: 'loading...',
      // duration: 2000
    });
    await loading.present();
    this.ViewServices.getServices().then((services) => {
      this.ArrayServices = services;
      loading.dismiss();
    })
    console.log('Loading dismissed!');
  }


}
