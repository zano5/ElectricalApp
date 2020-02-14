import { Component, OnInit,Input } from '@angular/core';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { MapService,Feature } from '../../Service/mapbox.service';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import{AlertController} from '@ionic/angular';
@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {


  checkAddress ="";

  @Input() flag1 :string
  URL = "/sign-in"
  public requestForm: FormGroup;


  moreRequest : boolean = false;
  moreRequestICT : boolean = false;
  coordinates : any;
  list : any;
  selectedAddress : string= "";
  lat;
  lng;
  user;
  time: string = "";
  date : string ="";
  ref : string;
  addresses = [];
  flag : boolean = true;
  descrp;;
  name;
  cost1;
  cost;
  KM;
  request = {
    refNo : "",
    service : "",
    serviceDesc : "",
    serviceCost : "",
    date : "",
    stamp : Date.now(),
    coords: [],
    time : "",
    distance : 0,
    calloutFee : 0,
    uid : ''
    
  
  }
  obj : any;
  obj1 : any;
  ArrayServices;
  ArrayICTServices;
  dat = new Date();
  day;
  constructor(private alertcontroller:AlertController,
    public ViewServices: AuthServiceService,
    private addr : ActivatedRoute,
    private modalCtrl:ModalController,
    private mapboxService :MapService,
    private fb: FormBuilder,) {

    this.ref = (Math.random()* 100000).toFixed(0) + "AAC";
    // this.requestForm = fb.group({
    //   address:  ['', [Validators.required, Validators.email,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z0-9-.]+$')]],
    //   date: ['', [Validators.required]],
    //   time: ['',  [Validators.required]]
    // });

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

   async presentModal() {

      this.flag = false;
 
  }
  run(i){
console.log(i)
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
  but1(){
    this.moreRequestICT = false; 
    console.log(this.moreRequestICT)
  }
  but(){
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
      this.KM = data.KM;
      console.log(data.lng + "  " + data.lat);
      // this.request.coords = [data.lng,data.lat];
      // console.log(this.request);
    
      // this.request.distance = this.KM;
      this.cost1 = this.KM * 5;
      // console.log(this.cost1);
      // this.request.calloutFee = this.cost1;
    })

    let name = localStorage.getItem("name");
    let description = localStorage.getItem("description")
    let cost = localStorage.getItem("cost");
    let flag = localStorage.getItem("flag");
    this.name = name;
    this.descrp = description;
    this.cost = cost;
    console.log(flag)
console.log(this.cost)
console.log(this.descrp)
console.log(this.name)

this.obj = this.ViewServices.getService();
this.obj1 = this.ViewServices.getServiceICT();

this.obj.subscribe((data)=>{
  this.ArrayServices = data;
  console.log(this.ArrayServices)

  })

  this.obj1.subscribe((data)=>{
    this.ArrayICTServices = data;
    console.log(this.ArrayICTServices)
  
    })

}


  submit(){
    // console.log(this.addresses)
    // console.log(this.addresses.length)
    console.log(this.selectedAddress)
    console.log(this.selectedAddress.length)
    this.request.service = this.name;
    this.request.serviceDesc = this.descrp;
    this.request.serviceCost = this.cost;
    this.request.refNo = this.ref;
    this.request.date = this.date.substr(0,10);
    // console.log(this.request);
    // console.log(this.time.substr(11,8) + " tyd");
    // console.log(this.date.substr(0,10) + " dag");
    this.request.time = this.time.substr(11,8);
    

    if (this.checkAddress ==  "") {
      alert("address field is required to make a request");
    }
    else {
      if(this.time.length > 0 && this.date.length > 0) {
        this.ViewServices.addRequest(this.request);
      }
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

      // make condition for to send request
      
    // this.ViewServices.addRequest(this.request);
  }

  

  addressCheck(event){


    this.checkAddress = event.target.value;
    console.log("info",this.checkAddress);    

  }

}
