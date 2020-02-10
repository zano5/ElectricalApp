import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  notificationURL = '/tabs/notifications';
  constructor(public TabService: AuthServiceService,public route: Router) { }

  ngOnInit() {
  }

  redirect() {
    // this.route.navigateByUrl('/tabs/notifications');
    this.TabService.setURL('/tabs/notifications');
    this.TabService.getUser(this.notificationURL);
    // console.log(this.TabService.getUser());
  }

  redirectTabs() {
    // this.TabService.setURL('/tabs/notifications');
  }
}
