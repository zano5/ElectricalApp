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
  ArrayICTServices;
  imagePath="assets/images/wired.jpg";
  obj : any;
  obj1 : any;
  flag : boolean = false;
  run: boolean =false;
  constructor(private router: Router,
    public loadingController: LoadingController,
    public ViewServices: AuthServiceService) {
  
     }

  ngOnInit() {
  // this.ViewServices.getUser();
  this.obj1 = this.ViewServices.getServiceICT();
  this.obj1.subscribe((data)=>{
    this.ArrayICTServices = data;
    console.log(this.ArrayICTServices)
    
  });

 this.loadingServices();


  }


  detail(id : any){
    this.router.navigateByUrl('service-detail')
    this.flag = true;
    this.router.navigate(['service-detail'],{queryParams : {key: id, flag : this.flag}} );

  }
  detail1(id : any){

    // this.router.navigateByUrl('service-detail')
    this.router.navigate(['service-detail'],{queryParams : {key: id}} );

  }
  runs(){
    this.router.navigateByUrl('request1');
  }

  async loadingServices() {
    const loading = await this.loadingController.create({
      message: 'loading...',
      //  duration: 20000
    });
    this.run= true;
    await loading.present();
    this.obj = this.ViewServices.getService();
    this.obj1 = this.ViewServices.getServiceICT();
    
    this.obj.subscribe((data)=>{
      this.ArrayServices = data;
      console.log(this.ArrayServices)
      loading.dismiss();
      this.run = false;
    });
  
    console.log('Loading dismissed!');
  }


}
