import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { PathService } from 'src/app/Service/path.service';
import { isUndefined, isNullOrUndefined } from 'util';
@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.page.html',
  styleUrls: ['./service-detail.page.scss'],
})
export class ServiceDetailPage implements OnInit {
  ArrayServices;
  ArrayICTServices;
  docKey;
  serviceName;
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

  averageRatings = 0;
  Average = 0;

  ReviewsArray = [];
  Total_Ratings = 0;
  Total_Length = 0;
  countRatings = 0;

  one_Rating = 0;
  two_Rating = 0;
  three_Rating = 0;
  four_Rating = 0;
  five_Rating = 0;

  services;
  Ratings;
  Average_Ratings;
  TotalViews = 0;

  value1 = 0;
  value;

  AllServices;
  Serv = [];
  RequestCount = 0;
  Combined_Services = [];
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
    
    // console.log('one')
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
      console.log(data);
      this.docKey = data.key;
      this.serviceName = data.name;
      this.counter = data.count;
      this.averageRatings = parseFloat(data.average_ratings);
      // console.log(this.averageRatings);
      if (data.flag) {
        this.flag = true;
      }
      else {
        this.flag = false;
      }
      // console.log(this.flag)
      // console.log(this.docKey)
    });

    // this.addr.queryParams.subscribe(params => {
    //   if (params && params.data) {
    //     this.Combined_Services = JSON.parse(params.data.navigationExtras);
    //     console.log(this.Combined_Services);
    //   }
    // });

    // this.ViewServices.getComments(this.docKey).subscribe((data) => {
    //   this.Comments_Array = data;
    // })

    this.ViewServices.getReviews(this.docKey).subscribe((data) => {
      this.Comments_Array = data;
      // console.log(this.Comments_Array);
      data.forEach((info) => {
        this.ReviewsArray.push(info);
        this.Information = info;
        this.name = this.Information;
        this.surname = this.Information;

        this.first_Char = String(this.name).charAt(0);
        this.second_Char = String(this.surname).charAt(0);

        for(var a = 0; a < this.ReviewsArray.length; a++){
          // console.log(this.ReviewsArray[a]);
          this.Total_Ratings = this.Total_Ratings + this.ReviewsArray[a].rate;

          if(this.ReviewsArray[a].rate == 1){
            this.one_Rating++;
          }else if(this.ReviewsArray[a].rate == 2){
            this.two_Rating++;
          }else if(this.ReviewsArray[a].rate == 3){
            this.three_Rating++;
          }else if(this.ReviewsArray[a].rate == 4){
            this.four_Rating++;
          }else if(this.ReviewsArray[a].rate == 5){
            this.five_Rating++;
          }else{}
        }

        this.countRatings = this.one_Rating + this.two_Rating + this.three_Rating + this.four_Rating + this.five_Rating;
        this.TotalViews = this.one_Rating + this.two_Rating + this.three_Rating + this.four_Rating + this.five_Rating;
        // this.value1 = this.one_Rating;
      })

      this.ViewServices.get_Electric_Average_Ratings(this.docKey).subscribe((data) => {
        if(isNullOrUndefined(data)){

        }else{
          this.services = data;
          this.Ratings = this.services.averageRating;
          this.Average_Ratings = this.Ratings.toFixed(1);
        }
      });
    })

    this.ViewServices.get_ICT_Average_Ratings(this.docKey).subscribe((data) => {
      if(isNullOrUndefined(data)){

      }else{
        this.services = data;
        this.Ratings = this.services.averageRating;
        this.Average_Ratings = this.Ratings.toFixed(1);
      }
    });

    this.ViewServices.get_Plumbing_Average_Ratings(this.docKey).subscribe((data) => {
      if(isNullOrUndefined(data)){

      }else{
        this.services = data;
        this.Ratings = this.services.averageRating;
        this.Average_Ratings = this.Ratings.toFixed(1);
      }
    });
    // for(var i = 0; i < this.ReviewsArray.length; i++){
    //   console.log(this.ReviewsArray[i]);
    // }

    // console.log(this.docKey);
    this.ViewServices.getDoc(this.docKey).subscribe((data) =>{
      console.log(data);
      if(isNullOrUndefined(data)){
      }else{
        this.ServiceDetails = data;
        this.Combined_Services.push(data);

        this.ViewServices.ViewAllRequests().subscribe((data) => {
          data.forEach((info) => {
            this.AllServices = info;
            if(isUndefined(this.AllServices.service)){
              if(isUndefined(this.AllServices.eleObj)){

              }else{
                for(var x = 0; x < this.AllServices.eleObj.length; x++){
                  if(this.ServiceDetails.name === this.AllServices.eleObj[x]){
                    this.RequestCount++;
                  }else{}
                }
              }
            }else{
              if(this.ServiceDetails.name === this.AllServices.service){
                this.RequestCount++;
              }else{
              console.log("false");
              }
            }
          });

          console.log(this.RequestCount);
        });
      }
    });

    this.ViewServices.getICTDoc(this.docKey).subscribe((data) =>{

      if(isNullOrUndefined(data)){
      }else{
        this.ServiceDetails = data;
        this.Combined_Services.push(data);

        this.ViewServices.ViewAllRequests().subscribe((data) => {
          data.forEach((info) => {
            this.AllServices = info;
            if(isUndefined(this.AllServices.service)){
              if(isUndefined(this.AllServices.ictObj)){

              }else{
                for(var x = 0; x < this.AllServices.ictObj.length; x++){
                  if(this.ServiceDetails.name === this.AllServices.ictObj[x]){
                    this.RequestCount++;
                  }else{}
                }
              }
            }else{
              if(this.ServiceDetails.name === this.AllServices.service){
                this.RequestCount++;
              }else{
              console.log("false");
              }
            }
          });

          console.log(this.RequestCount);
        });
      }
    });

    this.ViewServices.getPlumbingDoc(this.docKey).subscribe((data) => {

      if(isNullOrUndefined(data)){
      }else{
        this.ServiceDetails = data;
        this.Combined_Services.push(data);

        this.ViewServices.ViewAllRequests().subscribe((data) => {
          data.forEach((info) => {
            this.AllServices = info;
            if(isUndefined(this.AllServices.service)){
              if(isUndefined(this.AllServices.plumbingObj)){

              }else{
                for(var x = 0; x < this.AllServices.plumbingObj.length; x++){
                  if(this.ServiceDetails.name === this.AllServices.plumbingObj[x]){
                    this.RequestCount++;
                  }else{}
                }
              }
            }else{
              if(this.ServiceDetails.name === this.AllServices.service){
                this.RequestCount++;
              }else{
              console.log("false");
              }
            }
          });

          console.log(this.RequestCount);
        });
      }

      // if(data != null){
      //   this.ServiceDetails = data;
      //   this.Combined_Services.push(data);
      // }else{}
    });
    // console.log('two')
    // this.run= false;

    console.log(this.Combined_Services);

    // this.ViewServices.ViewAllRequests().subscribe((data) => {
    //   data.forEach((info) => {
    //     this.AllServices = info;
    //     if(isUndefined(this.AllServices.service)){
    //       if(isUndefined(this.AllServices.eleObj) && (isUndefined(this.AllServices.ictObj))){
            
    //       }else{} 
    //     }else{
    //       if(this.serviceName === this.AllServices.service){
    //         this.RequestCount++;
    //       }else{
    //         console.log("false");
    //       }
    //       // for(var i = 0; i < this.AllServices.length; i++){
    //       //   if(this.ServiceDetails.name == this.AllServices.service){
    //       //     this.RequestCount++;
    //       //     console.log(this.RequestCount);
    //       //   }else{
    //       //     console.log("false");
    //       //   }
    //       // }
    //     }
    //   });
    //   console.log(this.RequestCount);
    // });
  }

  ionViewDidLoad() {
  }

  request() {

    // this.router.navigate(['request'],{queryParams: {count: this.counter}});
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
