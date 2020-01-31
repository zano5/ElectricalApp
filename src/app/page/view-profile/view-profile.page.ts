import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { LoadingController,AlertController, ModalController } from '@ionic/angular';
import { Router } from "@angular/router";
import { UpdateNamesPage } from '../modal/update-names/update-names.page';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UpdateContactsPage } from '../modal/update-contacts/update-contacts.page';
import { UpdateEmailPage } from '../modal/update-email/update-email.page';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {
  UserProfile:any = [];
  Persona = [];

  constructor(public viewProfileService: AuthServiceService,
    public loadingController: LoadingController,
    public Alert:AlertController,
    public route: Router,
    public modalController: ModalController) { }

  ngOnInit() {
    this.loadingProfile();
  }

  back() {
    this.viewProfileService.Clear();
    this.route.navigateByUrl('/tabs/profile');
  }

  async UpdateNamesModal() {
    const modal = await this.modalController.create({
      component: UpdateNamesPage,
    });
    return await modal.present();
  }
  
  async UpdateEmailModal() {
    const modal = await this.modalController.create({
      component: UpdateEmailPage,
    })

    return await modal.present();
  }

  async UpdateContractsModal() {
    const modal = await this.modalController.create({
      component: UpdateContactsPage,
    })

    return await modal.present();
  }

  async loadingProfile() {
    const loading = await this.loadingController.create({
      message: 'loading...',
      // duration: 2000
    });
    await loading.present();
    this.viewProfileService.getUserProfile().then((data) => {
      this.UserProfile = data;
      console.log(this.UserProfile);
      loading.dismiss();
    })
  }


}
