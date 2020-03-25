import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesPageRoutingModule } from './services-routing.module';

import { ServicesPage } from './services.page';
import { StarRatingModule} from 'ionic4-star-rating';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    StarRatingModule,
    FormsModule,
    IonicModule,
    ServicesPageRoutingModule,
    MatExpansionModule
  ],
  declarations: [ServicesPage]
})
export class ServicesPageModule {}
