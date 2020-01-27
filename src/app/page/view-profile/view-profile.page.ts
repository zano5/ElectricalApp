import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Service/auth-service.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {

  constructor(public viewProfileService: AuthServiceService) { }

  ngOnInit() {
    this.viewProfileService.getUserProfile().then((data) => {
      console.log(data);
    })
  }

}
