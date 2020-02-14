import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Request1PageRoutingModule } from './request1-routing.module';

import { Request1Page } from './request1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Request1PageRoutingModule
  ],
  declarations: [Request1Page]
})
export class Request1PageModule {}
