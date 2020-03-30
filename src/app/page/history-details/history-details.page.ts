import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

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

    this.historyService.getUser_Info().subscribe((data) => {
      this.Information = data;
      this.name = this.Information.name;
      this.surname = this.Information.surname;

      this.historyService.name = this.Information.name;
      this.historyService.surname = this.Information.surname;
      
      // this.first_Char = String(this.name).charAt(0);
      // this.second_Char = String(this.surname).charAt(0);
      
    })

    // this.historyService.getComments(this.HistoryInfo.serviceID).subscribe((data) => {
    //   this.Comment_Array = data;
    //   console.log(this.Comment_Array);
    //   data.forEach((info) => {
    //     this.Alpha.push(info);
    //   })
    // });

    this.historyService.getReviews(this.HistoryInfo.serviceID).subscribe((data) => {
      this.Comment_Array = data;
      data.forEach((info) => {
        this.ReviewsArray.push(info);
        this.Information = info;
        this.name = this.Information.name;
        this.surname = this.Information.surname;
        
        console.log(this.ReviewsArray);
        this.first_Char = String(this.name).charAt(0);
        this.second_Char = String(this.surname).charAt(0);

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
      
      console.log(this.five_Rating);
      this.ProgressBarValueFive = this.five_Rating / 100;
      this.ProgressBarValueFour = this.four_Rating / 100;
      this.ProgressBarValueThree = this.three_Rating / 100;
      this.ProgressBarValueTwo = this.two_Rating / 100;
      this.ProgressBarValueOne = this.one_Rating / 100;
      
      this.countRatings = this.ReviewsArray.length;
    })
    // console.log(this.averageRatings);
    this.historyService.getAverageRatings(this.HistoryInfo.serviceID).subscribe((data) => {
      this.services = data;
      this.Ratings = this.services.averageRating;
      this.Ratings.toFixed(1);
      this.Average_Ratings = this.Ratings.toFixed(1);
    })
  }

  Comment() {
    this.date = moment().format('L');
    this.historyService.service_id = this.HistoryInfo.serviceID;
    this.historyService.submitReviews(this.rates,this.comments,this.date);

    if(this.comments != null){
      // this.historyService.Comments(this.HistoryInfo.serviceID,this.comments, this.name, this.surname);

      this.averageRatings = ((1 * this.one_Rating) + 
                            (2 * this.two_Rating) + 
                            (3 * this.three_Rating) + 
                            (4 * this.four_Rating) + 
                            (5 * this.five_Rating)) / 
                            (this.one_Rating + 
                              this.two_Rating + 
                              this.three_Rating + 
                              this.four_Rating + 
                              this.five_Rating);

      console.log(this.averageRatings);
      this.historyService.updateRatings(this.HistoryInfo.serviceID, this.averageRatings);
    }else{}

    // console.log(this.comments);
  }

  logRatingChange(event) {
    this.rates = event;
    console.log("Changing rates: " + this.rates);
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
