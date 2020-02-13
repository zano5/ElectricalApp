import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { Router } from "@angular/router";
import * as firebase from 'firebase';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  // notificationURL = '/tabs/notifications';
  constructor(public TabService: AuthServiceService,public route: Router) { 
    // this.router.events.pipe(filter((evt: any) => evt instanceof RoutesRecognized),
    // pairwise()).subscribe((events: RoutesRecognized[]) => {
    //   this.URL = events[0].urlAfterRedirects;
    // })
  }

  ngOnInit() {
  }

  redirect() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        this.route.navigateByUrl('/tabs/notifications');

      } else {
        this.TabService.URL = '/tabs/notifications';
        // this.TabService.setURL('/tabs/notifications');
        this.route.navigateByUrl('/sign-in');
      }
    });

    // this.TabService.URL = '/tabs/notifications';
    // this.TabService.getUser('/tabs/notifications');
  }
}
