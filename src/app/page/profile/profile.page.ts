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

  setURL() {
    this.profileService.getURL('/view-profile');
  }

Redirect() {
  // this.profileService.getUser(this.ViewProfileURL);
}

  terms() {
    this.router.navigateByUrl('terms');
  }


  contactInfo() {

    this.router.navigateByUrl('contact');

  }

  viewProfile() {
    if(this.results == 'true'){
      this.router.navigateByUrl('/view-profile');
    }else{
      this.router.navigateByUrl('/sign-in');
    }
  }
  

  // Method signOut() is for logging our user out
  signOut() {
    this.profileService.logOut().then((data) => {
      console.log(data);
    });
    this.router.navigateByUrl('/sign-in');

  }

}
