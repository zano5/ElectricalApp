import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthServiceService } from 'src/app/Service/auth-service.service';

@Component({
  selector: 'app-update-contacts',
  templateUrl: './update-contacts.page.html',
  styleUrls: ['./update-contacts.page.scss'],
})
export class UpdateContactsPage implements OnInit {
  updateContactsForm: FormGroup
  contacts;
  
  constructor(public modalController: ModalController,
    public contactServices: AuthServiceService,
    public formBuilder: FormBuilder) {
      this.updateContactsForm = formBuilder.group({
        contacts: ["",[Validators.pattern("^[0-9]+$"),Validators.maxLength(10)]]
      })
    }

  ngOnInit() {
  }

  updateContacts() {
    this.contactServices.UpdateNumber(this.contacts);
  }

  async CloseModal() {
    await this.modalController.dismiss();
  }

}
