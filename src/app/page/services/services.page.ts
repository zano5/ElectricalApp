import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {


  imagePath="assets/images/wired.jpg";

  constructor(private router: Router) { }

  ngOnInit() {
  }


  detail(){

    this.router.navigateByUrl('service-detail');

  }

}
