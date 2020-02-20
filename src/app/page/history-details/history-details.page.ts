import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Service/auth-service.service';

@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.page.html',
  styleUrls: ['./history-details.page.scss'],
})
export class HistoryDetailsPage implements OnInit {

  details;
  historyArray;
  Ref;
  constructor(public historyService: AuthServiceService) { }

  ngOnInit() {
    this.Ref = this.historyService.Ref;
    this.historyService.ViewHistoryDetails().subscribe((data) => {
      this.details = data;
      // if(this.Ref == this.details?.refNo){
      //   this.historyArray = data;
      // }else{
      // }
    })
  }

}
