import { TabsPage } from './page/tabs/tabs.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'welcome',
    loadChildren: () => import('./page/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./page/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'tabs', component: TabsPage, children: [
      {
        path: 'services',
        loadChildren: () => import('./page/services/services.module').then( m => m.ServicesPageModule)
      },

      {
        path: 'profile',
        loadChildren: () => import('./page/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./page/notifications/notifications.module').then( m => m.NotificationsPageModule)
      }
      
    ]
   
  },

  {
    path: 'service-detail',
    loadChildren: () => import('./page/service-detail/service-detail.module').then( m => m.ServiceDetailPageModule)
  },
  {
    path: 'request',
    loadChildren: () => import('./page/request/request.module').then( m => m.RequestPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./page/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./page/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./page/terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./page/register/register.module').then( m => m.RegisterPageModule)
  },  {
    path: 'sign-up',
    loadChildren: () => import('./page/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./page/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },


 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
