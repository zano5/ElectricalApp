import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { PathService } from 'src/app/Service/path.service';
@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.page.html',
  styleUrls: ['./service-detail.page.scss'],
})
export class ServiceDetailPage implements OnInit {
  ArrayServices;
  ArrayICTServices;
  docKey;
  flag: boolean = false;
  run: boolean =true;
  key : boolean = false;
  DocName;
  PlumbingServices;

  ServiceDetails;
  counter = 0;
  Comments_Array;

  name;
  surname;
  Information;
  first_Char;
  second_Char;
  constructor(private router: Router,
    private addr: ActivatedRoute,
    public ViewServices: AuthServiceService,
    public pathService: PathService) {
    // this.ViewServices.getServices().then((services) => {
    //   this.ArrayServices = services;

    // })
    // this.ViewServices.getServiceICT().subscribe((services) => {
    //   this.ArrayICTServices = services;

    // })
    
    console.log('one')
  }

  clearData() {
    this.ArrayServices = [];
    this.ArrayICTServices = [];
    this.PlumbingServices = [];
  }

  runs(){
    setTimeout(() =>{ this.run= false; }, 2000);
  }

  ngOnInit() {
    this.runs();
    this.addr.queryParams.subscribe(data => {
      // console.log(data);
      this.docKey = data.key;
      this.counter = data.count;
      // console.log(data);
      if (data.flag) {
        this.flag = true;
      }
      else {
        this.flag = false;
      }
      console.log(this.flag)
      // console.log(this.docKey)
    });

    // this.addr.queryParams.subscribe(params => {
    //   if (params && params.data) {
    //     this.ServiceDetails = JSON.parse(params.data);
    //     console.log(this.ServiceDetails)
    //   }
    // });

    // this.ViewServices.getComments(this.docKey).subscribe((data) => {
    //   this.Comments_Array = data;
    // })
    
    this.ViewServices.getReviews(this.docKey).subscribe((data) => {
      this.Comments_Array = data;
      data.forEach((info) => {
        this.Information = info;
        this.name = this.Information;
        this.surname = this.Information;

        this.first_Char = String(this.name).charAt(0);
        this.second_Char = String(this.surname).charAt(0);
      })
    })

    console.log(this.docKey);
    this.ViewServices.getDoc(this.docKey).subscribe((data) =>{
      if(data != null){
        this.ServiceDetails = data;
      }else{}
    });

    this.ViewServices.getICTDoc(this.docKey).subscribe((data) =>{
      // console.log(data)
      if(data != null){
        this.ServiceDetails = data;
      }else{}
    });

    this.ViewServices.getPlumbingDoc(this.docKey).subscribe((data) => {
      // console.log(data);
      if(data != null){
        this.ServiceDetails = data;
      }else{}
    });
    console.log('two')
    // this.run= false;
  }


  request() {

    this.router.navigate(['request'],{queryParams: {count: this.counter}});
    localStorage.clear();

    /////////This service id///////////////////////////
    localStorage.setItem("key", this.docKey);
    ////////////////is a new code////////////////

    localStorage.setItem("name", this.ServiceDetails.name);
    localStorage.setItem("cost", this.ServiceDetails.cost);
    localStorage.setItem("description", this.ServiceDetails.description);
    localStorage.setItem("count", this.counter.toString());

    // if(this.flag == true){
    //   //  console.log(this.flag)

    //   /////////This service id///////////////////////////
    //   localStorage.setItem("key", this.docKey);
    //   ////////////////is a new code////////////////

    //   localStorage.setItem("name", this.ArrayServices.name);
    //   localStorage.setItem("cost", this.ArrayServices.cost);
    //   localStorage.setItem("description", this.ArrayServices.description)
    // }
    // else{
    //   // console.log(this.ArrayICTServices)

    //   /////////This service id///////////////////////////
    //   localStorage.setItem("key", this.docKey);
    //   ////////////////is a new code////////////////
    //   // console.log(this.flag)
    //   localStorage.setItem("name", this.ArrayICTServices.name);
    //   localStorage.setItem("cost", this.ArrayICTServices.cost);
    //   localStorage.setItem("description", this.ArrayICTServices.description);
    // }
    // localStorage.setItem("flag", this.flag.toString());

    // const navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     data: JSON.stringify(items),
    //   }
    // };
    // this.router.navigate(['service-detail'], navigationExtras);

    this.pathService.getUser('request');
    this.ViewServices.URL = '/request';
  }

}
