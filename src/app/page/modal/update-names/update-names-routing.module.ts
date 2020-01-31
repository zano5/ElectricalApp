import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateNamesPage } from './update-names.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateNamesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateNamesPageRoutingModule {}
