import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateContactsPage } from './update-contacts.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateContactsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateContactsPageRoutingModule {}
