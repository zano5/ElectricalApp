import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateContactsPageRoutingModule } from './update-contacts-routing.module';

import { UpdateContactsPage } from './update-contacts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateContactsPageRoutingModule
  ],
  declarations: [UpdateContactsPage]
})
export class UpdateContactsPageModule {}
