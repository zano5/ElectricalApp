import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
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

  firstN;
  lastN;
  constructor(public modalController: ModalController,
    public formBuilder: FormBuilder,
    public updateNamesService: AuthServiceService,
    public route: Router,
    private navParams: NavParams) {
      this.updateForm = formBuilder.group({
        name: ["",[Validators.required,Validators.pattern("^[a-zA-Z]+$")]],
        surname: ["",[Validators.required,Validators.pattern("[a-zA-Z]+$")]]
      })
    }

  ngOnInit() {
    // this.UserData = this.updateNamesService.returnArray();
    this.firstN = this.navParams.get('name');
    this.lastN = this.navParams.get('surname');
  }

  UpdateNames() {
    this.updateNamesService.UpdateNames(this.name,this.surname);
    this.CloseModal() 
  }

  async CloseModal() {
    await this.modalController.dismiss();
  }
}
