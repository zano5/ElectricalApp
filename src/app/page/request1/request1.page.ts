import { Component, OnInit, Input } from '@angular/core';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { MapService, Feature } from '../../Service/mapbox.service';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MapPage } from '../map/map.page';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-request1',
  templateUrl: './request1.page.html',
  styleUrls: ['./request1.page.scss'],
})
export class Request1Page implements OnInit {
  URL = "/sign-in"
  checkAddress;
  moreRequest: boolean = false;
  moreRequestICT: boolean = false;
  coordinates: any;
  list: any;
  selectedAddress: string;
  lat;
  lng;
  user;
  time: string = "";
  date: string = "";
  ref: string;
  addresses = [];
  flag: boolean = true;
  descrp;;
  name;
  cost1;
  cost;
  KM;
  ictObj: any = [];
  eleObj: any = [];
  dat = new Date();
  runx: any = [];
  run1: any = [];
  request = {
    refNo: "",
    date: "",
    stamp: Date.now(),
    time: "",
    uid: '',
    eleObj : [],
    ictObj : []
  }
  obj: any;
  obj1: any;
  ArrayServices;
  ArrayICTServices;
  day: string;

  constructor(private alertcontroller: AlertController, public ViewServices: AuthServiceService, private addr: ActivatedRoute, private modalCtrl: ModalController, private mapboxService: MapService) {

    this.ref = (Math.random() * 100000).toFixed(0) + "AAC";

    // "2020-02-10"
    let month = this.dat.getMonth() + 1;
    console.log(this.dat.getDate())
    console.log(this.dat.getMonth())
    console.log(this.dat.getFullYear())
    if (this.dat.getMonth() < 10) {
      this.day = this.dat.getFullYear().toString() + '-0' + month.toString() + '-' + this.dat.getDate().toString();
    } else {
      this.day = this.dat.getFullYear().toString() + '-' + month.toString() + '-' + this.dat.getDate().toString();
    }
    console.log(this.day)
  }


  search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.mapboxService.search_word(searchTerm)
        .subscribe((features: Feature[]) => {
          this.coordinates = features.map(feat => feat.geometry)
          this.addresses = features.map(feat => feat.place_name)
          this.list = features;
          console.log(this.list)
        });
    } else {
      this.addresses = [];
    }
  }
  but1() {
    this.moreRequestICT = false;
    console.log(this.moreRequestICT)
  }
  but() {
    this.moreRequestICT = true;
    console.log(this.moreRequestICT)
  }

  onSelect(address, i) {
    this.selectedAddress = address;
    //  selectedcoodinates=

    console.log("lng:" + JSON.stringify(this.list[i].geometry.coordinates[0]))
    console.log("lat:" + JSON.stringify(this.list[i].geometry.coordinates[1]))
    this.lng = JSON.stringify(this.list[i].geometry.coordinates[0])
    this.lat = JSON.stringify(this.list[i].geometry.coordinates[1])
    // this.user.coords = [this.lng,this.lat];
    console.log("index =" + i)
    console.log(this.selectedAddress)
    // this.user.address = this.selectedAddress;
    this.addresses = [];
  }
  ngOnInit() {
    // this.requestService.getUser(this.URL);

    this.addr.queryParams.subscribe(data => {
      console.log(data);
      // this.KM = data.KM;
      // console.log(data.lng + "  " + data.lat);
      // this.request.coords = [data.lng,data.lat];
      // console.log(this.request);

      // this.request.distance = this.KM;
      // this.cost1 = this.KM * 5;
      // console.log(this.cost1);
      // this.request.calloutFee = this.cost1;
    })

    this.obj = this.ViewServices.getService();
    this.obj1 = this.ViewServices.getServiceICT();

    this.obj.subscribe((data) => {
      this.ArrayServices = data;
      console.log(this.ArrayServices)

    })

    this.obj1.subscribe((data) => {
      this.ArrayICTServices = data;
      console.log(this.ArrayICTServices)

    })

  }

  run(i) {
    console.log(i)
  }

  submit() {
    // let a = this.runx;
    console.log(this.runx)
    console.log(this.run1)
    let a = 0;
    let b = 0;

    this.request.eleObj = this.run1;
    this.request.ictObj = this.runx;
    // this.request.service = this.name;
    // this.request.serviceDesc = this.descrp;
    // this.request.serviceCost = this.cost;
    this.request.refNo = this.ref;
  
    // console.log(this.time.length)
    
    if (this.checkAddress ==  "") {
      alert("address field is required to make a request");
    }
 
      if (this.time.length == 0 && this.date.length == 0) {
        alert("Date and Time required to make a request")
        console.log('Date and Time required to make a request ')
      }
      else {
        if(this.date.length > 0) {
          this.request.date = this.date.substr(0, 10);
          }
          else {
            alert("Date required to make an request")
          }
          if(this.time.length > 0) {
            this.request.time = this.time.substr(11, 8);
        
            }
            else {
              alert("Time required to make an request")
            }
      }
    // console.log(this.request);
    // console.log(this.time.substr(11,8) + " tyd");
    // console.log(this.date.substr(0,10) + " dag");
    if (this.run1.length == 0 && this.runx.length == 0) {
      alert("No services seleccted or booked for both ICT and electrical service")
      console.log('No services seleccted or booked for both ICT and electrical service')
    }
    else {
      if (this.runx.length > 0) {
        for (a; a < this.runx.length; a++) {
        
          console.log(this.request.ictObj[a]+ ' services seleccted under ICT service')
          }
         
        } else {
          console.log('No services seleccted or booked under ICT service')
          alert("No services seleccted or booked under ICT service")
        }
       
        if (this.run1.length > 0) {
           
        for (b; b < this.run1.length; b++) {    
          console.log(this.request.eleObj[b]+ ' services seleccted  under Electrical service')
            }
        }
        else {
          console.log('No services seleccted or booked under Electrical service')
          alert("No services seleccted or booked under ICT service")
        }
    }
 
    // this.ViewServices.addRequest(this.request);
  }


  addressCheck(event){


    this.checkAddress = event.target.value;
    console.log("info",this.checkAddress);    

  }
}
