import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Service/auth-service.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  URL = '/sign-in'
  constructor(public NotificationService: AuthServiceService) { }

  ngOnInit() {
    this.NotificationService.getUser(this.URL)
  }


  invoice(){

  }

}
