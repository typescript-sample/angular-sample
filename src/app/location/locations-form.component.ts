import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewContainerRef } from "@angular/core";
import { Router } from "@angular/router";
import { BaseSearchComponent, buildFromUrl, initElement, navigate, StringMap } from "angularx";
import { inputSearch, registerEvents, storage } from "uione";
import { LocationClient } from "./service/location";
import { Location, LocationFilter } from "./service/location/location";
import * as L from 'leaflet';

@Component({
  selector: 'app-locations-form',
  templateUrl: './locations-form.html',
})
export class LocationsFormComponent extends BaseSearchComponent<Location, LocationFilter> implements OnInit {
  constructor(protected viewContainerRef: ViewContainerRef, protected router: Router, locationService: LocationClient) {
    super(locationService, inputSearch());
  }
  map: L.Map | undefined;
  viewable = true;
  editable = true;
  viewList = true;
  list: Location[] = [];
  filter: LocationFilter = {
    id: "",
    name: "",
    description: "",
    longitude: 0,
    latitude: 0,
  }
  setList(list: Location[]): void {
    this.list = list; 
    this.addMarkerToMap();
  }
  onSetViewList(e: { preventDefault: () => void }) {
    e.preventDefault();
    this.viewList = !this.viewList;
  };

  ngOnInit(): void {
    this.form = initElement(this.viewContainerRef, registerEvents);
    const s = this.mergeFilter(buildFromUrl());
    this.initMap();
    this.load(s, storage.autoSearch);
    this.hideFilter = true;
  }
  add(e: MouseEvent) {
    e.preventDefault();
    navigate(this.router, `/location/add`);
  };
  edit(e: MouseEvent, id: string) {
    e.preventDefault();
    navigate(this.router, `/location/edit`,[id]);
  };
  addMarkerToMap():void{
    if(this.map){
      var mapIcon = L.icon({
        iconRetinaUrl: "../../assets/images/marker-icon-2x.png",
        iconUrl: "../../assets/images/marker-icon.png",
        shadowUrl: "../../assets/images/marker-shadow.png",
      });
      const map = this.map;
      this.list.forEach(location => {
          
        L.marker([location.longitude, location.latitude], { icon: mapIcon }).on('click', () => {
          navigate(this.router, `${this.router.url}/${location.id}`);
        }).bindPopup(`<span>${location.name}</span>`).addTo(map)
      });
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