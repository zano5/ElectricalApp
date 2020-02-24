import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from '../module/must-match';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import{AlertController} from '@ionic/angular';
import { from } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';
import { PathService } from 'src/app/Service/path.service';
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
    uid:'',
  surname : '',
    number : 0,
  pass : ''}
  
  url;
  constructor(private fb: FormBuilder,  
    private router: Router,
    public ViewServices: AuthServiceService,
    private alertcontroller:AlertController,
    private pathService: PathService) {

    this.register = fb.group({
      name: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30), Validators.required])],
      surname: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30), Validators.required])],
      number: ['', Validators.compose([ Validators.minLength(10), Validators.maxLength(10), Validators.required])],
      email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(12), Validators.required])],
      cpassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'cpassword')
    });

   
  }

signUp(){
this.url = this.ViewServices.URL = '/tabs/notifications';

this.user.name = this.register.value.name;
this.user.surname = this.register.value.surname;
this.user.number = this.register.value.number;
this.user.email = this.register.value.email;
this.user.pass = this.register.value.password;
  console.log(this.user);
this.ViewServices.addUser(this.user,this.url);

}
  ngOnInit() {
  }

  singIn(){
    this.router.navigateByUrl('/sign-in')
  }

  async PresentAlert() {
    const alert=await this.alertcontroller.create({
      header:'Alert',
      message:'You have successfulyy signed up',
      buttons:['Ok']
    });

    await alert.present();
    let result=await alert.onDidDismiss();
    this.router.navigateByUrl('/sign-in')


  
  }


}
