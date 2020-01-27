import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.page.html',
  styleUrls: ['./service-detail.page.scss'],
})
export class ServiceDetailPage implements OnInit {
  ArrayServices;
  docKey ;
  constructor(private router: Router,private addr : ActivatedRoute, public ViewServices: AuthServiceService) { 
    this.ViewServices.getServices().then((services) => {
      this.ArrayServices = services;
     
    })
  }

  ngOnInit() {

    this.addr.queryParams.subscribe(data => {
      this.docKey = data.key;
      console.log(this.docKey)
    });

    this.ViewServices.getDoc(this.docKey).subscribe((data) =>{
      console.log(data)
      this.ArrayServices = data;
    })
  }


  request() {

    this.router.navigateByUrl('request');

  }

}
