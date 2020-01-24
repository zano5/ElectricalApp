import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.page.html',
  styleUrls: ['./service-detail.page.scss'],
})
export class ServiceDetailPage implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }


  request() {

    this.router.navigateByUrl('request');

  }

}
