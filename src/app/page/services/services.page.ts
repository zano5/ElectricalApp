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
  AllServices;

  requestCounter = 0;
  firstCounter = 0;
  secondCounter = 0;
  thirdCounter = 0;
  fourthCounter = 0;
  fifthCounter = 0;
  sixthCounter = 0;

  service_info;

  MostRequested = [];
  constructor(private router: Router,
    public loadingController: LoadingController,
    public ViewServices: AuthServiceService) {
  
     }

  ngOnInit() {
  // this.ViewServices.getUser();
  this.obj1 = this.ViewServices.getServiceICT();
  this.obj1.subscribe((data)=>{
    this.ArrayICTServices = data;
    // console.log(this.ArrayICTServices)
    
  });

  this.ViewServices.getService().subscribe((services) => {
    services.forEach((data) => {
      this.service_info = data;
    })
  })

  this.ViewServices.ViewAllRequests().subscribe((requests) => {

    requests.forEach((requestInfo) => {
      this.AllServices = requestInfo;
      if(this.AllServices.service == "Process level control & security lightening") {
        // this.requestCounter++;
        this.firstCounter++;
      }else if(this.AllServices.service == "Maintenance of transformers"){
        this.secondCounter++;
      }else if(this.AllServices.service == "Electrin fencing & earthing"){
        this.thirdCounter++;
      }else if(this.AllServices.service == "plumbing"){
        this.fourthCounter++;
      }else if(this.AllServices.service == "Regular load testing and balancing"){
        this.fifthCounter++;
      }else if(this.AllServices.service == "Installation of conduits and trunkin"){
        this.sixthCounter++;
      }else{}
    })

    console.log(this.firstCounter);
    console.log(this.secondCounter);
    console.log(this.thirdCounter);
    console.log(this.fourthCounter);
    console.log(this.fifthCounter);
    console.log(this.sixthCounter);
  })

  this.MostRequested.push(
    this.firstCounter,
    this.secondCounter,
    this.thirdCounter,
    this.fourthCounter,
    this.fifthCounter,
    this.sixthCounter
  )

// let sortedDescPoints = this.MostRequested.sort((a,b) => {

// })
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
  
    // console.log('Loading dismissed!');
  }


}
