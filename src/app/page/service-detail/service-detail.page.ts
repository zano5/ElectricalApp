import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { PathService } from 'src/app/Service/path.service';
@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.page.html',
  styleUrls: ['./service-detail.page.scss'],
})
export class ServiceDetailPage implements OnInit {
  ArrayServices;
  ArrayICTServices;
  docKey;
  flag: boolean = false;
  run: boolean =true;

  DocName
  constructor(private router: Router,
    private addr: ActivatedRoute,
    public ViewServices: AuthServiceService,
    public pathService: PathService) {
    // this.ViewServices.getServices().then((services) => {
    //   this.ArrayServices = services;

    // })
    // this.ViewServices.getServiceICT().subscribe((services) => {
    //   this.ArrayICTServices = services;

    // })
    
    console.log('one')
  }

  clearData() {
    this.ArrayServices = null;
    this.ArrayICTServices = null;
  }

  runs(){
    setTimeout(() =>{ this.run= false; }, 2000);
  }

  ngOnInit() {
    this.runs();
    this.addr.queryParams.subscribe(data => {
      this.docKey = data.key;
      // console.log(data)
      this.flag = data.flag;
      if (data.flag) {
        this.flag = true;
      }
      else {
        this.flag = false;
      }
      // console.log(this.flag)
      // console.log(this.docKey)
    });

    this.ViewServices.getDoc(this.docKey).subscribe((data) =>{
      console.log(data)
      this.ArrayServices = data;
    })

    this.ViewServices.getICTDoc(this.docKey).subscribe((data) =>{
      // console.log(data)
      this.ArrayICTServices = data;
    })
    console.log('two')
    // this.run= false;
  }


  request() {

    localStorage.clear();
    if(this.flag == true){
      //  console.log(this.flag)
    localStorage.setItem("name", this.ArrayServices.name);
    localStorage.setItem("cost", this.ArrayServices.cost);
    localStorage.setItem("description", this.ArrayServices.description)
    }
    else{
      // console.log(this.ArrayICTServices)
      // console.log(this.flag)
      localStorage.setItem("name", this.ArrayICTServices.name);
      localStorage.setItem("cost", this.ArrayICTServices.cost);
      localStorage.setItem("description", this.ArrayICTServices.description);
    }
    // localStorage.setItem("flag", this.flag.toString());
    this.pathService.URL = '/service-detail';
    this.pathService.getUser('request');
  }

}
