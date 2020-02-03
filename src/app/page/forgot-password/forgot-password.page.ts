import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  public forgotpasswordForm: FormGroup;
  
  constructor(private fb: FormBuilder,private auth :AuthServiceService) { 
    this.forgotpasswordForm = this.fb.group({
      email: ['', Validators.compose([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z0-9-.]+$'), Validators.required])],
    })
  }

  resetPass(){
    console.log(this.forgotpasswordForm.value.email)
    // this.auth.resetPassword();
  }
  ngOnInit() {
  }

}
