import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Service/auth-service.service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.page.html',
  styleUrls: ['./service-detail.page.scss'],
})
export class ServiceDetailPage implements OnInit {
  constructor(private router: Router,public description: AuthServiceService) { }

  ngOnInit() {
  }


  request() {

    // this.router.navigateByUrl('request');
    this.description.getUser('request');
  }

}
