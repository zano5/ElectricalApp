import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-names',
  templateUrl: './update-names.page.html',
  styleUrls: ['./update-names.page.scss'],
})
export class UpdateNamesPage implements OnInit {
  updateForm:FormGroup;
  name;
  surname;
  UserData = [];
  FirstName;
  LastName;
  constructor(public modalController: ModalController,
    public formBuilder: FormBuilder,
    public updateNamesService: AuthServiceService,
    public route: Router) {
      this.updateForm = formBuilder.group({
        name: ["",[Validators.pattern("^[a-zA-Z]+$")]],
        surname: ["",[Validators.pattern("[a-zA-Z]+$")]]
      })
    }

  ngOnInit() {
    // this.UserData = this.updateNamesService.returnArray();
  }

  UpdateNames() {
    this.updateNamesService.UpdateNames(this.name,this.surname);
  }

  async CloseModal() {
    await this.modalController.dismiss();
  }
}
