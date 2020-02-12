import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  results;
  ViewProfileURL = '/sign-in';
  constructor(private router: Router,public profileService: AuthServiceService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        this.results = 'true';
      } else {
        this.results = 'false';
        // this.router.navigateByUrl('/sign-in');
      }
    });
  }

Redirect() {
  // this.profileService.getUser(this.ViewProfileURL);
  this.profileService.URL = '/tabs/profile';
  // this.profileService.setURL('/tabs/profile');
  this.profileService.getUser('/view-profile');
}

logOutRedirect() {
  this.profileService.URL = '/tabs/profile_logout';
  // this.profileService.setURL('/tabs/profile_logout')
}

  terms() {
    this.router.navigateByUrl('terms');
  }


  contactInfo() {

    this.router.navigateByUrl('contact');

  }

  viewProfile() {
    // if(this.results == 'true'){
    //   this.router.navigateByUrl('/view-profile');
    // }else{
    //   this.router.navigateByUrl('/sign-in');
    // }
  }
  

  // Method signOut() is for logging our user out
  signOut() {
    this.profileService.logOut();
    // this.profileService.URL = '/tabs/profile_logout';
    this.router.navigateByUrl('/sign-in');


  }

}
