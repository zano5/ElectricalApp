import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  constructor(public modalController: ModalController,
    public formBuilder: FormBuilder,
    public updateEmailService: AuthServiceService) {
      this.updateEmailForm = formBuilder.group({
        email: ["",[Validators.pattern("^[0-9a-zA-Z]+@[a-zA-Z0-9]+\\.[a-zA-Z0-9]+$")]]
      })
    }

  ngOnInit() {
  }

  updateEmail() {
    this.updateEmailService.UpdateEmail(this.email);
  }
  
  async closeModal() {
    await this.modalController.dismiss();
  }
}
