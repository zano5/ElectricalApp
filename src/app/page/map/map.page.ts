import { Component, OnInit,ViewChild, ElementRef ,Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  @ViewChild('map', { static: false }) mapNativeElementnativeElement: ElementRef;

  map :any;
  route : any;
  data : any;
  tempA : number;
  tempB : number;
  obj : any;
  obj1 = {
    lat : 0,
    lng : 0
  };
  geocoder : any;
  KM : any;
  startPosition: any;
  flag : boolean = true;
  constructor(public geolocation: Geolocation,private http: HttpClient,private modalCtrl:ModalController,private router : Router) {

    
    this.geolocation.getCurrentPosition()
      .then((response) => {

        console.log( response.coords)
        // this.startPosition = response.coords;
        // this.plotLat = this.startPosition.latitude;
        // this.plotLng = this.startPosition.longitude;

      })

      console.log(this.flag)

   }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });

  
    let lng = this.obj1.lng;
    let lat = this.obj1.lat;
   console.log(this.obj1)
    this.router.navigate(['request'] ,{queryParams : {KM: this.KM, lng : lng, lat : lat}} );
  }

  ionViewDidEnter() {
    var coordinates = document.getElementById('coordinates');
    mapboxgl.accessToken = 'pk.eyJ1IjoibmVvLXB1bGUiLCJhIjoiY2p4cTF6Z2huMGx6czNtbnY2aWdwdWU5NiJ9._Dj2fBUZgCoryf1ehZTweQ';
    this.map = new mapboxgl.Map({
      
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [28.2631339,-25.7515526],  // starting position [lng, lat]
    zoom: 9, // starting zoom
   
    });
    this.geocoder = new MapboxGeocoder({ // Initialize the geocoder
      accessToken: mapboxgl.accessToken, // Set the access token
      mapboxgl: mapboxgl, // Set the mapbox-gl instance
      marker: {
        color: 'orange',
        draggable : true,
        
      },
      
      placeholder: 'Search for places ', // Placeholder text for the search bar
      // Coordinates of UC Berkeley
    });

    this.geolocation.getCurrentPosition()
    .then((response) => {
console.log("jjj" + response.timestamp )
      this.startPosition = response.coords;
      // this.originPosition= response.Address;
      this.map.setCenter([this.startPosition.longitude, this.startPosition.latitude]);

      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = 'url(assets/images/icon.jpg)';
      el.style.width = '40px';
      el.style.height = '40px';

      var marker = new mapboxgl.Marker(el)
        .setLngLat([this.startPosition.longitude, this.startPosition.latitude])
        .setPopup(new mapboxgl.Popup({ offset: 25 })
          .setHTML('<p>' + 'You are here' + '</p> '))
        .addTo(this.map);
    })

    // icon of the company pin pointed on the map


    
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(assets/images/scc.jpg)';
    el.style.width = '40px';
    el.style.height = '40px';

    var marker = new mapboxgl.Marker(el)
      .setLngLat([28.37146290674474, -25.72136149865932])
      .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML('<p>' + 'Head Offices are located here' + '</p> '))
      .addTo(this.map);

    this.map.addControl(this.geocoder);
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.on('load', () => {
    var start = [28.2631339,-25.7515526];
    var end = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: start
        }
      }
      ]
    };
    if (this.map.getLayer('end')) {
      this.map.getSource('end').setData(end);
    } else {
      this.map.addLayer({
        id: 'end',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: start
              }
            }]
          }
        },
        paint: {
          'circle-radius': 10,
          'circle-color': 'rgb(20, 204, 250)'
        }
      });
    }
  });
    
// initialize the map canvas to interact with later
var canvas = this.map.getCanvasContainer();

// an arbitrary start will always be the same
// only the end or destination will change

// this is where the code for the next step will go

this.map.on('mousemove', (e) => {
  document.getElementById('info').innerHTML =
  // e.point is the x, y coordinates of the mousemove event relative
  // to the top-left corner of the map3
  
  JSON.stringify(e.point) +
  '<br />' +
  // e.lngLat is the longitude, latitude geographical position of the event
  JSON.stringify(e.lngLat.wrap());
  // console.log(e);
  // console.log(e.lngLat);
  this.obj = e.lngLat;
  console.log(this.obj);
  });

this.map.on('click', () => {
 
  this.tempA = 28.2631339;
  this.tempB = -25.7515526;
  var start = [28.2631339,-25.7515526];
  var coords = [this.obj.lng,this.obj.lat];

  this.getRoute(coords);
  var marker   = new mapboxgl.Marker()
  .setLngLat([this.obj.lng, this.obj.lat])
  .addTo(this.map);

  this.obj1.lat = this.obj.lat;
  this.obj1.lng = this.obj.lng;

function onDragEnd() {
  var lngLat = marker.getLngLat();
  this.temp = lngLat.lng;
  this.temp1 = lngLat.lat;
 
  coordinates.style.display = 'block';
  console.log(lngLat.lng);
  console.log(lngLat.lat);
  console.log(this.pos);
 
  }
 
});
  }
  ngOnInit() {
   this.ionViewDidEnter();


  }
  getRoute(end) {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change

    var start = [28.2631339,-25.7515526];
   
    // console.log(end[0])
    // console.log(end[1])
    // console.log(end)
   
    var url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/';
    
    var req =  this.http.get(url + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + 'pk.eyJ1IjoibmVvLXB1bGUiLCJhIjoiY2p4cTF6Z2huMGx6czNtbnY2aWdwdWU5NiJ9._Dj2fBUZgCoryf1ehZTweQ');
    
    console.log(this.tempA)
  
    req.subscribe((obj) => {
      this.data = obj;
      this.data = this.data.routes[0];
      this.route = this.data.geometry.coordinates;
       var geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: this.route
        }
      };

      //if the route already exists on the map, reset it using setData
      if (this.map.getSource('route')) {
        this.map.getSource('route').setData(geojson);
      } else { // otherwise, make a new request
        this.map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: geojson
              }
            }
            
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75
          }
        });
      }

      
      console.log(this.data)
      console.log(this.route)
      this.KM = (this.data.distance/ 1000).toPrecision(2);
      console.log( this.KM+ " KM")
    });
  }

  


}
