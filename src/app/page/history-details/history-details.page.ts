import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

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
  Key;
  constructor(public historyService: AuthServiceService,
    public loadingController: LoadingController,
    public addr: ActivatedRoute) { }

  ngOnInit() {
    // this.loadingHistoryDetails();
    
    this.addr.queryParams.subscribe(params => {
      if (params && params.data) {
        this.HistoryInfo = JSON.parse(params.data);
        console.log(this.HistoryInfo.serviceID);
      }
    });

    this.historyService.getComments(this.HistoryInfo.serviceID).subscribe((data) => {
      data.forEach((info) => {
        this.Comment_Array = info;
        this.historyService.getUserByID(this.Comment_Array.uid).subscribe((data) => {
          this.User_Info = data;
        })
      })
    })

  }

  Comment(key,comments) {
    if(this.comments != null){
      this.historyService.Comments(this.HistoryInfo.serviceID,this.comments);
    }else{}

    console.log(this.comments);
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
