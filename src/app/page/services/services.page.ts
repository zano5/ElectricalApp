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
  requestsMade;

  mostRequested_Electrical_Services;
  mostRequested_Plumbing_Services;
  mostRequested_ICT_Services;

  sorted_array = [];
  New_Sorted_Array = [];

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

  detail_id(id : any, requestMade){
    // this.router.navigateByUrl('service-detail')
    this.requestsMade = parseInt(requestMade);
    this.count = this.requestsMade + 1;
    this.flag = true;
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
    
    this.ViewServices.getMostRequested_Electrical_Services().subscribe((data) => {
      this.mostRequested_Electrical_Services = data;
      this.MostRequested.push(this.mostRequested_Electrical_Services);
    });

    this.ViewServices.getMostRequested_ICT_Services().subscribe((data) => {
      this.mostRequested_ICT_Services = data;
      this.MostRequested.push(this.mostRequested_ICT_Services);
    });

    this.ViewServices.getRequested_Plumbing_Services().subscribe((data) => {
      this.mostRequested_Plumbing_Services = data;
      this.MostRequested.push(this.mostRequested_Plumbing_Services);

      for(var i = 0; i < this.MostRequested.length; i++){
        for(var j = 0; j < this.MostRequested[i].length; j++){
          this.sorted_array.push(this.MostRequested[i][j]);
          console.log(this.sorted_array);
        }
      }
    });

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
