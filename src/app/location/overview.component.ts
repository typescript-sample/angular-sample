import { Location as LocationPath } from "@angular/common";
import * as L from 'leaflet';
import { Location, LocationService } from "./service/location/location";
import { navigate, buildId} from "angularx";
import { Router } from "@angular/router";
import { Component} from '@angular/core';
import { LocationClient } from "./service/location";
import { ActivatedRoute } from "@angular/router";


@Component({
    selector: "app-overview",
    templateUrl:'./overview.html',
    styleUrls: ['./rate.css']
})
export default class OverviewComponent {

    service: LocationService;
    map: L.Map | undefined;
    id: string = "";
    route: ActivatedRoute;
    list: Location[] = [];
    location!: Location;
    viewList = false;
    constructor(public locationPath: LocationPath, locationService: LocationClient, route: ActivatedRoute) {
        this.service = locationService;
        this.route = route;
    }
    
    async getLocation(id: string) {
        const currentLocation = await this.service.load(id);
        if (currentLocation) this.location = currentLocation;
    }
    
    ngOnInit(): void {
        
        this.id = buildId<string>(this.route) || "";        
        this.getLocation(this.id);
        setTimeout(() => {
            this.initMap();
            this.addMarkerToMap();
        }, 1000);
        
    }
    


    addMarkerToMap():void{
        if(this.map){
          var mapIcon = L.icon({
            iconRetinaUrl: "../../assets/images/marker-icon-2x.png",
            iconUrl: "../../assets/images/marker-icon.png",
            shadowUrl: "../../assets/images/marker-shadow.png",
          });
          const map = this.map;
          L.marker([this.location.longitude, this.location.latitude], { icon: mapIcon }).on('click', () => {
            //   navigate(this.router, `${this.router.url}/${location.id}`);
            }).bindPopup(`<span>${this.location.name}</span>`).addTo(map)
          
        //   this.list.forEach(location => {
              
            
        //   });
        }
      }
    private initMap(): void {
        this.map = L.map('mapid', {
    
          maxZoom: 100,
          attributionControl: true,
          zoomControl: true,
          scrollWheelZoom: true,
          dragging: true,
          easeLinearity: 0.35,
        }).setView([10.854886268472459, 106.63051128387453], 16)
    
        this.map.invalidateSize()
        
        const tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          { attribution: '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' })
        tiles.addTo(this.map);
    
      }

}