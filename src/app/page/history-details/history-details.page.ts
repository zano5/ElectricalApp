import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { isNullOrUndefined, isUndefined } from 'util';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.page.html',
  styleUrls: ['./history-details.page.scss'],
})
export class HistoryDetailsPage implements OnInit {

  details;
  history_Array;
  Ref;
  HistoryInfo;

  comments;
  Comment_Array;
  User_Info;
  Alpha = [];

  Key;
  name;
  surname;
  User_Array;
  rates = 0;

  date;

  TestInfo;
  Information;
  first_Char;
  second_Char;

  ////////////////////////
  ProgressBarValueFive = 0;
  ProgressBarValueFour = 0;
  ProgressBarValueThree = 0;
  ProgressBarValueTwo = 0;
  ProgressBarValueOne = 0;
  ////////////////////
  //////////////////////

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

  Ratings = 0;
  services;
  Average_Ratings;
  slice:number = 5;
  number_of_comments = 0;
  serviceID;
  constructor(public historyService: AuthServiceService,
    public loadingController: LoadingController,
    public addr: ActivatedRoute) {
    }

  ngOnInit() {
    // this.loadingHistoryDetails();
    
    this.addr.queryParams.subscribe(params => {
      if (params && params.data) {
        this.HistoryInfo = JSON.parse(params.data);
        console.log(this.HistoryInfo);
      }
    });

    this.historyService.get_Service(this.HistoryInfo.serviceName).subscribe((data) => {
      if(isUndefined(data)){
      }else{
        this.serviceID = data[0];
        console.log(this.serviceID);
      }
    });

    this.historyService.get_ICT_Service(this.HistoryInfo.serviceName).subscribe((data) => {
      if(isNullOrUndefined(data)){
        return
      }else{
        this.serviceID = data[0];
        console.log(this.serviceID);
      }
    });

    this.historyService.get_Plumbing_Service(this.HistoryInfo.serviceName).subscribe((data) => {
      console.log(data);
      if(isNullOrUndefined(data)){
        return
      }else{
        this.serviceID = data[0];
        console.log(this.serviceID);
      }
    });

    
    this.historyService.getReviews(this.serviceID).subscribe((data) => {
      this.Comment_Array = data;
      data.forEach((info) => {
        this.ReviewsArray.push(info);
        this.Information = info;
        this.number_of_comments++;
        
        console.log(this.ReviewsArray);

        for(var a = 0; a < this.ReviewsArray.length; a++){
          // console.log(this.ReviewsArray[a]);
          // this.Total_Ratings = this.Total_Ratings + this.ReviewsArray[a].rate;
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

      })
      
      this.ProgressBarValueFive = this.five_Rating / 100;
      this.ProgressBarValueFour = this.four_Rating / 100;
      this.ProgressBarValueThree = this.three_Rating / 100;
      this.ProgressBarValueTwo = this.two_Rating / 100;
      this.ProgressBarValueOne = this.one_Rating / 100;
      
      this.countRatings = this.one_Rating + this.two_Rating + this.three_Rating + this.four_Rating + this.five_Rating;
    })

    this.historyService.get_Electric_Average_Ratings(this.serviceID).subscribe((data) => {
      if(isNullOrUndefined(data)){

      }else{
        this.services = data;
        this.Ratings = this.services.averageRating;
        this.Ratings.toFixed(1);
        this.Average_Ratings = this.Ratings.toFixed(1);
      }
    })

    this.historyService.get_ICT_Average_Ratings(this.serviceID).subscribe((data) => {
      if(isNullOrUndefined(data)){

      }else{
        this.services = data;
        this.Ratings = this.services.averageRating;
        this.Ratings.toFixed(1);
        this.Average_Ratings = this.Ratings.toFixed(1);
      }
    });

    this.historyService.get_Plumbing_Average_Ratings(this.serviceID).subscribe((data) => {
      if(isNullOrUndefined(data)){

      }else{
        this.services = data;
        this.Ratings = this.services.averageRating;
        this.Ratings.toFixed(1);
        this.Average_Ratings = this.Ratings.toFixed(1);
      }
    });
  }

  loadReviews(event) {
    setTimeout(() => {
      this.slice += 5;
      event.target.complete();
    }, 500);
  }

  async loadingHistoryDetails() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();

    this.Ref = this.historyService.Ref;
    this.historyService.ViewHistoryDetails().subscribe((data) => {
      this.details = data
      data.forEach((info) => {
        if(this.Ref == info.refNo){
        this.history_Array = info;
        }else{
        }
      })
      loading.dismiss();
    })
  }


}
