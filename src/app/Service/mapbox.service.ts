
import {  Component,Injectable, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import mapboxgl from 'mapbox-gl';

export interface MapboxOutput {
  attribution: string;
  features: Feature[];
  geometry: Geometry[];
  query: [];
}
export interface Feature {
  place_name: string;
  geometry: string;

}
export interface Geometry {
  coordinates: string;
}


@Injectable({
  providedIn: 'root'
})
export class MapService {
  @ViewChild('map', { static: false }) mapNativeElementnativeElement: ElementRef;
  map;
  constructor(private http: HttpClient) {

  }

  run(){
    var coordinates = document.getElementById('coordinates');
    mapboxgl.accessToken = 'pk.eyJ1IjoibmVvLXB1bGUiLCJhIjoiY2p4cTF6Z2huMGx6czNtbnY2aWdwdWU5NiJ9._Dj2fBUZgCoryf1ehZTweQ';
    var map = new mapboxgl.Map({

    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [28.2631339,-25.7515526],  // starting position [lng, lat]
    zoom: 9 // starting zoom

    });
  }
  
  search_word(query: string) {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    return this.http.get(url + query + '.json?types=address&access_token=pk.eyJ1IjoibmVvLXB1bGUiLCJhIjoiY2p4cTI0MGF0MGlnajNjbDMzMW9nMzJ6OSJ9.QgND5rJKyVYEmTjBJIrq3g')
      .pipe(map((res: MapboxOutput) => {
        return res.features;
      }))
  }



}
