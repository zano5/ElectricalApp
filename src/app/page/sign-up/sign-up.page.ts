import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from '../module/must-match';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  register: FormGroup;
  user={
    name:'',
    email:'',
    uid:'',}

  constructor(private fb: FormBuilder,  private router: Router,public ViewServices: AuthServiceService) {

    this.register = fb.group({
      name: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30), Validators.required])],
      email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(12), Validators.required])],
      cpassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'cpassword')
    });
  
  }

signUp(user){

this.user.name = this.register.value.name;
this.user.email = this.register.value.email;
// this.user.password = this.register.value.password;
  // console.log(this.user);



this.ViewServices.addUser(this.user);

}
  ngOnInit() {
  }

  singIn(){
    this.router.navigateByUrl('/sign-in')
  }

}
