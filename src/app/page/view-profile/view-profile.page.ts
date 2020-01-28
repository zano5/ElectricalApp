import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { LoadingController,AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {
  UserProfile:any = [];

  constructor(public viewProfileService: AuthServiceService,
    public loadingController: LoadingController,
    public Alert:AlertController) { }

  ngOnInit() {
    this.loadingProfile();
  }

  async editName() {
    const alert = await this.Alert.create({
      header: 'Alert',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Enter your name'
        },{
          name: 'surname',
          type: 'text',
          placeholder: 'Enter your surname'
        },
      ],
      // subHeader: 'Subtitle',
      // message: 'This is an alert message.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },{
          text: 'Edit',
          role: "edit",
          cssClass: 'secondary',
          handler: (names) => {
            // this.viewProfileService.UpdateNames(names.name,names.surname);
            console.log('Confirm Edit');
            this.loadingProfile();
          }
        },
      ]
    });

    await alert.present();
  }

  async editEmail() {
    const alert = await this.Alert.create({
      header: 'Alert',
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Enter your new location'
        },
      ],
      // subHeader: 'Subtitle',
      // message: 'This is an alert message.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },{
          text: 'Edit',
          role: "edit",
          cssClass: 'secondary',
          handler: (Email) => {
            // this.viewProfileService.UpdateEmail(Email.email);
            this.loadingProfile();
            console.log('Confirm Edit');
          }
        },
      ]
    });

    await alert.present();
  }
  
  async editNumber() {
    const alert = await this.Alert.create({
      header: 'Alert',
      inputs: [
        {
          name: 'number',
          type: 'text',
          placeholder: 'Enter your contact number',
          max: 10
        }
      ],
      // subHeader: 'Subtitle',
      // message: 'This is an alert message.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },{
          text: 'Edit',
          role: "edit",
          cssClass: 'secondary',
          handler: (number) => {
            if(number.number == ""){
            }else{
              this.viewProfileService.UpdateNumber(number.number);
            }
            this.loadingProfile();
            console.log('Confirm Edit');
          }
        },
      ]
    });

    await alert.present();
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
