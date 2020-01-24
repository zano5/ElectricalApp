import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Service/auth-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  email;
  password;

  constructor(private router: Router,public SignInService:AuthServiceService) { }

  ngOnInit() {
  }

  setUserName(email) {
    this.SignInService.getUserName(email);
  }

  signIn(){

    this.router.navigateByUrl('tabs/services')

  }

}
