import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewProfilePageRoutingModule } from './view-profile-routing.module';
import { ViewProfilePage } from './view-profile.page';
// import { UpdateNamesPage } from '../modal/update-names/update-names.page';
// import { UpdateEmailPage } from '../modal/update-email/update-email.page';
// import { UpdateContactsPage } from '../modal/update-contacts/update-contacts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewProfilePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ViewProfilePage],
  entryComponents: []
})
export class ViewProfilePageModule {}
// UpdateNamesPage,UpdateEmailPage,UpdateContactsPage
// UpdateNamesPage,UpdateEmailPage,UpdateContactsPage