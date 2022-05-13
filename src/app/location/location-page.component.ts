import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { buildId } from "angularx";
import { LocationClient } from "./service/location";
import { Location, LocationService } from "./service/location/location";
@Component({
    selector: 'app-location-page',
    templateUrl: './location-page.html'
})
export default class LocationPageComponent implements OnInit {
    service: LocationService;
    route: ActivatedRoute;
    location!: Location;
    id: string = "";
    imageOnline = '../../assets/images/online.svg';
    constructor(locationService: LocationClient, route: ActivatedRoute) {
        this.service = locationService;
        this.route = route;
    }
    ngOnInit(): void {
        //5d146cbffbdf2b1d30742262
        this.id = buildId<string>(this.route) || "";        
        this.getLocation(this.id);
    }
    async getLocation(id: string) {
        const currentLocation = await this.service.load(id);
        if (currentLocation) this.location = currentLocation;
    }
}