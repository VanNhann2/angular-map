import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor() { }
    location: Location
    selectedMarker: Marker

    ngOnInit() {
        this.location = {
            latitude: 16.061255,
            longitude: 108.160061,
            mapType: "satelite",
            zoom: 15,
            markers: [
                {
                    lat:16.061255 ,
                    lng: 108.160061,
                    label: "new york"

                }
            ]
        }
    }

    addMarker(lat: number, lng: number) {
        this.location.markers.push({
            lat,
            lng,
            label: Date.now().toLocaleString()

        })
    }

    // selectMarker(event) {
    //     this.selectedMarker = {
    //         lat: event.latitude,
    //         lng: event.longitude,
    //         label: 
    //     }
    // }

    markerDragEnd(coords: any, $event: MouseEvent) {
        this.location.latitude = coords.latitude
        this.location.longitude = coords.longitude
    }
}

interface Marker {
    lat: number;
    lng: number;
    label: string;

}

interface Location {
    latitude: number;
    longitude: number;
    mapType: string;
    zoom: number;
    markers: Array<Marker>;
}