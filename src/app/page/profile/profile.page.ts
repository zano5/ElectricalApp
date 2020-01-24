import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }



  terms() {
    this.router.navigateByUrl('terms');
  }


  contactInfo() {

    this.router.navigateByUrl('contact');

  }

  


  signOut() {

    this.router.navigateByUrl('sign-in')

  }

}
