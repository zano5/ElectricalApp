import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateNamesPageRoutingModule } from './update-names-routing.module';
import { UpdateNamesPage } from './update-names.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateNamesPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [UpdateNamesPage]
})
export class UpdateNamesPageModule {}
