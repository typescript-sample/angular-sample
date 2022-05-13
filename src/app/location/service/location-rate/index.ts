import { Injectable } from '@angular/core';
import { HttpRequest } from "@/app/shared/HttpRequest";
import { Client } from 'web-clients';
import { LocationRate, LocationRateFilter, locationRateModel, LocationRateService } from './location-rate';
import { config } from '@/config';

@Injectable()
export class LocationRateClient extends Client<LocationRate, string, LocationRateFilter> implements LocationRateService {
    constructor(http: HttpRequest) {
        super(http, config.location_rate_url, locationRateModel);
        this.searchGet = true;
        this.getLocationByLocationId = this.getLocationByLocationId.bind(this);
    }
    getLocationByLocationId(locationId: string): Promise<LocationRate[]> {
        const url = this.serviceUrl + '/' + locationId;
        return this.http.get(url);
    }
}
