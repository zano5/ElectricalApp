import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthServiceService } from 'src/app/Service/auth-service.service';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.page.html',
  styleUrls: ['./update-email.page.scss'],
})
export class UpdateEmailPage implements OnInit {
  updateEmailForm: FormGroup;
  email

  e_mail;
  constructor(public modalController: ModalController,
    public formBuilder: FormBuilder,
    public updateEmailService: AuthServiceService,
    private navParams: NavParams) {
      this.updateEmailForm = formBuilder.group({
        email: ["",[Validators.required,Validators.pattern("^[0-9a-zA-Z]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]+$")]]
      })
    }

  ngOnInit() {
    this.e_mail = this.navParams.get('email');
  }

  updateEmail() {
    // this.updateEmailService.UpdateEmail(this.email).subscribe();
    this.updateEmailService.UpdateEmail(this.email);
  }
  
  async closeModal() {
    await this.modalController.dismiss();
  }
}
