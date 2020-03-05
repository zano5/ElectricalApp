import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { StarRatingModule } from 'ionic4-star-rating';

import { HistoryDetailsPageRoutingModule } from './history-details-routing.module';

import { HistoryDetailsPage } from './history-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StarRatingModule,
    HistoryDetailsPageRoutingModule
  ],
  declarations: [HistoryDetailsPage]
})
export class HistoryDetailsPageModule {}
