import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EditComponent } from "angularx";
import { inputEdit } from "uione";
import { LocationClient } from "./service/location";
import { Location } from "./service/location/location";
import {Status} from "uione"
import * as L from "leaflet";
@Component({
    selector:'app-location-form',
    templateUrl:'./location-form.html'
})
export class LocationFormComponent extends EditComponent<Location, string> implements OnInit{
    constructor(viewContainerRef:ViewContainerRef, route:ActivatedRoute,private locationService:LocationClient){
        super(viewContainerRef,route,locationService,inputEdit());
        this.location = this.createModel();
        this.patchable = false;
        
    }
    map: L.Map | undefined;
    Status = Status
    location:Location;
    ngOnInit(): void {
        // this.initMap();
        this.onInit();
        
    }
    openModal():void{
        console.log("1000");
        
    }
    closeModal():void{

    }
    save(event?: Event, isBack?: boolean): void {
        console.log(this.location);
        
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