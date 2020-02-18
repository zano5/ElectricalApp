import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { Router } from "@angular/router";
import * as firebase from 'firebase';
import { PathService } from 'src/app/Service/path.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  notificationURL = '/tabs/notifications';
  constructor(public TabService: AuthServiceService,
    public route: Router,
    public pathService: PathService) {
  }

  ngOnInit() {
  }

  redirect() {
    this.pathService.getUser(this.notificationURL);
    // this.TabService.setURL(this.notificationURL);
  }
}
