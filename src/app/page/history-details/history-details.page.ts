import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.page.html',
  styleUrls: ['./history-details.page.scss'],
})
export class HistoryDetailsPage implements OnInit {

  details;
  historyArray;
  Ref;
  constructor(public historyService: AuthServiceService,
    public loadingController: LoadingController) { }

  ngOnInit() {
    this.loadingHistoryDetails();
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
        this.historyArray = info;
        }else{
        }
      })
      loading.dismiss();
    })
  }


}
