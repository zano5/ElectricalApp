import { Component, OnInit,Input } from '@angular/core';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { MapService,Feature } from '../../Service/mapbox.service';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import{AlertController} from '@ionic/angular';
import { Key } from 'protractor';
import * as moment from 'moment';
import { PathService } from 'src/app/Service/path.service';

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
    uid : '',
    status: "Pending",
    serviceID: ''
  }

  requestObject = {
    refNo : "",
    serviceDesc : "",
    serviceCost : "",
    date : "",
    stamp : Date.now(),
    coords: [],
    time : "",
    distance : 0,
    calloutFee : 0,
    uid : '',
    status: "Pending",
    eleObj : [],
    ictObj : [],
    plumbingObj: []
  }

  Key;
  obj : any;
  obj1 : any;
  ArrayServices;
  ArrayICTServices;
  ArrayPlumbingServices;
  dat = new Date();
  day;

  counter:number = 0;
  request_made:number = 0;
  docArray;
  countNum;
  sum = 0;

  minDate;
  runx: any = [];
  run1: any = [];
  runp:any = [];

  ElectricalArray = [];
  ICTArray = [];
  PlumbingArray = [];
  constructor(private alertcontroller:AlertController,
    public ViewServices: AuthServiceService,
    private addr : ActivatedRoute,
    private modalCtrl:ModalController,
    private mapboxService :MapService,
    private fb: FormBuilder,
    public pathService: PathService) {

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
    // if (this.dat.getMonth() < 10) {
    //   this.day = this.dat.getFullYear().toString() + '-0' + month.toString() + '-' + this.dat.getDate().toString();
    // } else {
    //   this.day = this.dat.getFullYear().toString() + '-' + month.toString() + '-' + this.dat.getDate().toString();
    // }
    // console.log(this.day)

    // this.minDate = moment().format('L');

    if (this.dat.getMonth() < 10 && this.dat.getDate() < 10) {
      this.day = this.dat.getFullYear().toString() + '-0' + month.toString() + '-'+   '0'+this.dat.getDate().toString();
    } else {
      this.day = this.dat.getFullYear().toString() + '-' + month.toString() + '-' + this.dat.getDate().toString();
    }
    if (this.dat.getDate() < 10) {
      this.day = this.dat.getFullYear().toString() + '-0' + month.toString() + '-' +   '0'+this.dat.getDate().toString();
    } else {
      this.day = this.dat.getFullYear().toString() + '-' + month.toString() + '-' + this.dat.getDate().toString();
    }
    if (this.dat.getMonth() < 10) {
      this.day = this.dat.getFullYear().toString() + '-0' + month.toString() + '-' +   this.dat.getDate().toString();
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

  collect(event) {
    console.log(event);
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
    // this.ViewServices.getUser();
    console.log(this.ViewServices.getUser());
    // this.ViewServices.getUserProfile().subscribe((data) => {
    //   console.log(data);
    // });

    this.obj = this.ViewServices.getService();
    this.obj1 = this.ViewServices.getServiceICT();

    this.ViewServices.getService().subscribe((data)=>{
      this.ArrayServices = data;
      data.forEach((info) => {
        this.ElectricalArray.push(info);
      });
    })

    this.ViewServices.getServiceICT().subscribe((data)=>{
      this.ArrayICTServices = data;
      data.forEach((info) => {
        this.ICTArray.push(info);
      });
      // console.log(this.ArrayICTServices);
    })

    this.ViewServices.getPlumbingServices().subscribe((data) => {
      this.ArrayPlumbingServices = data;
      data.forEach((info) => {
        this.PlumbingArray.push(info);
      });
    });

    this.ViewServices.getDoc(localStorage.getItem("key")).subscribe((data) => {
      if(data != null){
        this.docArray = data;
        console.log(this.docArray.requestsMade);
        this.counter = parseInt(this.docArray.requestsMade);
        console.log(this.counter);
      }else{}
    });

    this.ViewServices.getICTDoc(localStorage.getItem("key")).subscribe((data) => {
      if(data != null){
        this.docArray = data;
        console.log(this.docArray.requestsMade);
        this.counter = parseInt(this.docArray.requestsMade);
        console.log(this.counter);
      }else{}
    })

    this.ViewServices.getPlumbingDoc(localStorage.getItem("key")).subscribe((data) => {
      if(data != null){
        this.docArray = data;
        console.log(this.docArray.requestsMade);
        this.counter = parseInt(this.docArray.requestsMade);
        console.log(this.counter);
      }else{}
    })

    this.addr.queryParams.subscribe(data => {
      this.KM = data.KM;
      // console.log(data.lng + "  " + data.lat);
      // this.request.coords = [data.lng,data.lat];
      // this.request.distance = this.KM;
      this.cost1 = this.KM * 5;
      // this.request.calloutFee = this.cost1;
    })

    this.countNum = parseInt(localStorage.getItem("count"));
    console.log(this.countNum);
    // let number:number = parseInt(this.docArray.requestsMade);
    // console.log(this.docArray.requestsMade)
    let key = localStorage.getItem("key");
    ////////////////////////////////////
    let name = localStorage.getItem("name");
    let description = localStorage.getItem("description")
    let cost = localStorage.getItem("cost");
    let flag = localStorage.getItem("flag");
    this.name = name;
    this.descrp = description;
    this.cost = cost;
    /////////////////////////////
    /////////////////////////////
    this.Key = key;
    console.log(flag);
    console.log(this.cost);
    console.log(this.descrp);
    console.log(this.name);

    // for(let name in this.ElectricalArray){
    //   console.log(name);
    // }

    this.ElectricalArray.forEach((data) => {
      console.log(data);
    });
    // this.ElectricalArray.forEach((data) => {
    //   console.log(data);
    // });
}


  submit(){
    
    console.log(this.run1);
    console.log(this.runx);
    console.log(this.selectedAddress)
    console.log(this.selectedAddress.length)
    
    if((this.checkAddress == "") && (this.time.length == 0) && (this.date.length == 0)){
      alert("Address, date and time are required to make a request.");
    }else if((this.checkAddress == "") && (this.date.length == 0)){
      alert("Address and date are required to make a request.");
    }else if((this.checkAddress == "") && (this.time.length == 0)){
      alert("Address and time are required to make a request.");
    }else if((this.time.length == 0) && (this.date.length == 0)){
      alert("Date and time are required to make a request.");
    }else if(this.checkAddress == ""){
      alert("Address is required to make a request.");
    }else if(this.date.length == 0){
      alert("Date is required to make a request.");
    }else if(this.time.length == 0){
      alert("Time is required to make a request.");
    }else{
        this.request.service = this.name;
        this.request.serviceDesc = this.descrp;
        this.request.serviceCost = this.cost;
        this.request.refNo = this.ref;
        this.request.date = this.date.substr(0,10);
        this.request.serviceID = this.Key;
        this.request.time = this.time.substr(11,8);

        if((this.run1.length > 0) || (this.runx.length > 0) || (this.runp.length > 0)){
      
          for(var a = 0; a < this.ElectricalArray.length; a++){
            if(this.ElectricalArray[a].name == this.name){
              this.run1.push(this.name);
            }else{
            }
          }
    
          for(var b = 0; b < this.ICTArray.length; b++){
            if(this.ICTArray[b].name == this.name){
              this.runx.push(this.name);
            }else{}
          }
    
          for(var c = 0; c < this.PlumbingArray.length; c++){
            if(this.PlumbingArray[c].name == this.name){
              this.runp.push(this.name);
            }else{}
          }
            this.requestObject.refNo = this.ref;
            this.requestObject.date = this.date.substr(0,10);
            this.requestObject.time = this.time.substr(11,8);
            this.requestObject.uid = this.ViewServices.getUser();
            this.requestObject.eleObj = this.run1;
            this.requestObject.ictObj = this.runx;
            this.requestObject.plumbingObj = this.runp;
            this.ViewServices.addRequest(this.requestObject);
        }else{
          this.ViewServices.addRequest(this.request);
        }
    }

    this.countNum = parseInt(localStorage.getItem("count"));
    console.log(this.countNum);

    // this.ViewServices.electricalUpdateCounter(this.Key, this.countNum);
  }

  
  addressCheck(event){
    this.checkAddress = event.target.value;
    console.log("info",this.checkAddress);    

  }

}
