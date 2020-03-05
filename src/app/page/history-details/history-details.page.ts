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

  Information;
  first_Char;
  second_Char;
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

    // this.historyService.getUser_Info().subscribe((data) => {
    //   this.Information = data;
    //   this.name = this.Information.name;
    //   this.surname = this.Information.surname;
    //   this.Alpha.push({
    //     Name: this.name,
    //     Surname: this.surname
    //   })
    // })

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
        this.Information = info;
        this.name = this.Information.name;
        this.surname = this.Information.surname;
        
        this.first_Char = String(this.name).charAt(0);
        this.second_Char = String(this.surname).charAt(0);

      })
    })
  }

  Comment() {
    this.date = moment().format('L');
    this.historyService.service_id = this.HistoryInfo.serviceID;
    this.historyService.submitReviews(this.rates,this.comments,this.date);

    if(this.comments != null){
      this.historyService.Comments(this.HistoryInfo.serviceID,this.comments, this.name, this.surname);
    }else{}

    console.log(this.comments);
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
