import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // hiển thị tất cả control của bản đồ
  panControl:true;
  zoomControl:true;
  mapTypeControl:true;
  scaleControl:true;
  streetViewControl:true;
  overviewMapControl:true;
  rotateControl:true


    title: string = 'AGM project';
    latitude: number;
    circleRadius: number;
    longitude: number;
    zoom: number;
    address: string;
    private geoCoder;
  
    @ViewChild('search', {static: false})
    public searchElementRef: ElementRef;
  
  
    constructor(
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone
    ) { }
  
  
    ngOnInit() {

      this.circleRadius = 3000;
      
      //load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
        this.setCurrentLocation();
        this.geoCoder = new google.maps.Geocoder;
  
        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
          types: ["address"]
        });
        // let circle = new google.maps.Circle({
        //   center: this.geoCoder.geocode({ 'location': { lat: this.latitude, lng: this.longitude }}),
        //   radius:20000,
        //   strokeColor:"#0000FF",
        //   strokeOpacity:0.8,
        //   strokeWeight:2,
        //   fillColor:"#0000FF",
        //   fillOpacity:0.4
        // });

        // circle.addListener("place_changed", () => {
        //   this.ngZone.run(() => {
        //     //get the place result
        //     let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
        //     //verify result
        //     if (place.geometry === undefined || place.geometry === null) {
        //       return;
        //     }
  
        //     //set latitude, longitude and zoom
        //     this.latitude = place.geometry.location.lat();
        //     this.longitude = place.geometry.location.lng();
        //     this.zoom = 12;
        //   });
        // });

        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
  
            //set latitude, longitude and zoom
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 12;
          });
        });
      });
    }
  
    // Get Current Location Coordinates
    private setCurrentLocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 8;
          this.getAddress(this.latitude, this.longitude);
        });
      }
    }
  
  
    markerDragEnd($event: MouseEvent) {
      console.log($event);
      this.latitude = $event.coords.lat;
      this.longitude = $event.coords.lng;
      this.getAddress(this.latitude, this.longitude);
    }
  
    getAddress(latitude, longitude) {
      this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
        console.log(results);
        console.log(status);
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 17;
            this.address = results[1].formatted_address;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
  
      });
    }
  


  }
  