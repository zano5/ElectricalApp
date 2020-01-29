import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  email;
  password;

  public loginForm: FormGroup;
  public forgotpasswordForm: FormGroup;
  isForgotPassword: boolean = true;
  
  constructor(private fb: FormBuilder,  private router: Router,public SignInService:AuthServiceService

   ) {

    this.loginForm = fb.group({
      email:  ['', [Validators.required, Validators.email,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z0-9-.]+$')]],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(12), Validators.required])],
    });
   
 
 }

  ngOnInit() {
  }

  setUserName(email) {
    this.SignInService.getUserName(email);
  }

  signIn(){

    this.router.navigateByUrl('tabs/services')

  }
  

}
