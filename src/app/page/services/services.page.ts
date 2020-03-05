import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import * as firebase from "firebase";

import { LoadingController } from '@ionic/angular';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { PathService } from 'src/app/Service/path.service';

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

  service_info = [];

  count = 0;

  MostRequested = [];
  PlumbingServices = [];
  id = [];
  constructor(private router: Router,
    public loadingController: LoadingController,
    public ViewServices: AuthServiceService,
    public pathService: PathService) {
      this.count = 0;
      console.log(this.count);
     }

  ngOnInit() {
    
  // this.ViewServices.getUser();
  this.obj1 = this.ViewServices.getServiceICT();
  this.obj1.subscribe((data)=>{
    this.ArrayICTServices = data;
    // console.log(this.ArrayICTServices)
    
  });

  ////////////////////////////////////////////////////
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////////
  this.ViewServices.getService().subscribe((services) => {
    // this.service_info = services;
    services.forEach((data) => {
      this.service_info = data;
    })
  })

  this.ViewServices.ViewAllRequests().subscribe((requests) => {
    // console.log(requests);
    requests.forEach((requestInfo) => {
      this.AllServices = requestInfo;
    })
  });

  console.log(this.service_info);
  // this.ViewServices.getDoc(this.service_info.id).subscribe((data) => {
  //   console.log(data);
  // })
  // console.log(this.MostRequested);
  this.loadingServices();
}

redirect() {
  this.pathService.getUser("request1");
}

  detail_id(id : any){
    // this.router.navigateByUrl('service-detail')
    this.flag = true;
    this.count++;
    this.router.navigate(['service-detail'],{queryParams : {key: id, flag : this.flag, count: this.count}});
  }

  // detail(items) {
  //   const navigationExtras: NavigationExtras = {
  //     queryParams: {
  //       data: JSON.stringify(items),
  //     }
  //   };
  //   this.router.navigate(['service-detail'], navigationExtras);
  // }

  // detail1(id : any){

  //   // this.router.navigateByUrl('service-detail')
  //   // this.flag = true;
  //   this.router.navigate(['service-detail'],{queryParams : {key: id, flag: this.flag}});

  // }

  // plumbingID(id: any) {
  //   // this.flag = true;
  //   this.router.navigate(['service-detail'],{queryParams: {key: id, flag: this.flag}});
  // }

  runs(){
    // this.router.navigateByUrl('request1');
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
    
    this.ViewServices.getPlumbingServices().subscribe((plumbing) => {
      this.PlumbingServices = plumbing;
    })

    this.obj.subscribe((data)=>{
      this.ArrayServices = data;
      console.log(this.ArrayServices)
      loading.dismiss();
      this.run = false;
    });
  
    // console.log('Loading dismissed!');
  }


}
