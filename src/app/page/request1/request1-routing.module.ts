import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Request1Page } from './request1.page';

const routes: Routes = [
  {
    path: '',
    component: Request1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Request1PageRoutingModule {}
