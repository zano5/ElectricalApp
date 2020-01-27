import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Service/auth-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private router: Router,public profileService: AuthServiceService) { }

  ngOnInit() {
  }



  terms() {
    this.router.navigateByUrl('terms');
  }


  contactInfo() {

    this.router.navigateByUrl('contact');

  }

  viewProfile() {
    this.router.navigateByUrl('view-profile');
  }
  

  // Method signOut() is for logging our user out
  signOut() {
    this.profileService.logOut().then((data) => {
      console.log(data);
    });
    // this.router.navigateByUrl('sign-in')

  }

}
