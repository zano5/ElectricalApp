import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { LoadingController } from '@ionic/angular';
import { PathService } from 'src/app/Service/path.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  previousRequests;
  constructor(public historyService: AuthServiceService,
    public loadingController: LoadingController,
    public pathService: PathService,
    public route: Router) { }

  ngOnInit() {
    this.presentLoading();
  }

  setRef(ref) {
    this.historyService.Ref = ref;
  }

  redirect() {
    this.route.navigateByUrl('/tabs/profile');
  }

  detail(items) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(items),
      }
    };
    this.route.navigate(['history-details'], navigationExtras);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      // duration: 2000
    });
    await loading.present();
    this.historyService.ViewHistory().subscribe((data) => {
      this.previousRequests = data;
      console.log(this.previousRequests);
      loading.dismiss();
    })
    // const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }
}
