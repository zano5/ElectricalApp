import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { LoadingController,AlertController, ModalController } from '@ionic/angular';
import { Router } from "@angular/router";
import { UpdateNamesPage } from '../modal/update-names/update-names.page';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UpdateContactsPage } from '../modal/update-contacts/update-contacts.page';
import { UpdateEmailPage } from '../modal/update-email/update-email.page';
import { database } from 'firebase';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {
  UserProfile:any;
  Persona = [];

  constructor(public viewProfileService: AuthServiceService,
    public loadingController: LoadingController,
    public Alert:AlertController,
    public route: Router,
    public modalController: ModalController) {
      this.viewProfileService.getUserProfile().subscribe((data) => {
        this.UserProfile = data;
        console.log(this.UserProfile);
    
      })
    }

  ngOnInit() {
    // this.loadingProfile();
  }

  back() {
    this.viewProfileService.Clear();
    this.route.navigateByUrl('/tabs/profile');
  }

  async UpdateNamesModal(data) {
    const modal = await this.modalController.create({
      component: UpdateNamesPage,
      componentProps: {
        name: data.name,
        surname: data.surname
      }
    });
    return await modal.present();
  }
  
  async UpdateEmailModal(data) {
    const modal = await this.modalController.create({
      component: UpdateEmailPage,
      componentProps: {
        email: data.email
      }
    })

    return await modal.present();
  }

  async UpdateContractsModal(data) {
    const modal = await this.modalController.create({
      component: UpdateContactsPage,
      componentProps: {
        contacts: data.number
      }
    })

    return await modal.present();
  }

  async loadingProfile() {
    const loading = await this.loadingController.create({
      message: 'loading...',
      // duration: 2000
    });
    await loading.present();
    // this.viewProfileService.getUserProfile().then((data) => {
    //   this.UserProfile = data;
    //   console.log(this.UserProfile);
    //   loading.dismiss();
    // })
  }
  // filechanged(event){
  //   const files=event.target.files
  //   console.log(files)
  // }

}
