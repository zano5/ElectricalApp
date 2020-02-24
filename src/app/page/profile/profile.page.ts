import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import * as firebase from 'firebase';
import { PathService } from 'src/app/Service/path.service';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  results;
  ViewProfileURL = '/sign-in';
  constructor(private router: Router,
    public profileService: AuthServiceService,
    public pathService: PathService) {
    }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        this.results = 'true';
      } else {
        this.results = 'false';
      }
    });
  }

Redirect() {
  // this.pathService.URL = '/tabs/profile';

  // this.router.events.pipe(filter((evt: any) => evt instanceof RoutesRecognized),
  //   pairwise()).subscribe((events: RoutesRecognized[]) => {
  //   // this.pathService.URL = events[0].urlAfterRedirects;
  // })

  this.pathService.getUser('/view-profile');
  this.profileService.URL = '/view-profile';
}

HistoryRedirect() {
  // this.pathService.getUser('/history');
  // this.profileService.URL = '/history';
  this.router.navigateByUrl('history');
}
history(){
  this.router.navigateByUrl('transactions');
}
  terms() {
    this.router.navigateByUrl('terms');
  }

  contactInfo() {

    this.router.navigateByUrl('contact');

  }

  // Method signOut() is for logging our user out
  signOut() {
    this.profileService.signOut();
  }

}
