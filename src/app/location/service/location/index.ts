import { Injectable } from "@angular/core";
import { UserAccount } from "uione";
// import { HttpRequest } from "web-clients";
import { Client } from "web-clients";
import {config} from '@/config';

// import { config } from "../../../config";
// import { FileUploads, Thumbnail } from "../../../uploads/model";
import { LocationRate } from "../location-rate/location-rate";
import {
  locationModel,
  LocationFilter,
  Location,
  LocationService,
} from "./location";
import { HttpRequest } from "@/app/shared/HttpRequest";
import { FileUploads, Thumbnail } from "@/app/uploads/service";
@Injectable()
export class LocationClient extends Client<Location, string, LocationFilter> implements LocationService {
  private user: UserAccount = JSON.parse(sessionStorage.getItem("authService") || "{}") as UserAccount;
  constructor(http: HttpRequest) {
    super(http, config.location_url, locationModel);
    this.searchGet = true;
    this.getLocationByType = this.getLocationByType.bind(this);
    this.rateLocation = this.rateLocation.bind(this);
  }

  getLocationByType(type: string): Promise<Location[]> {
    const url = this.serviceUrl + "/type/" + type;
    return this.http.get(url);
  }
  rateLocation(obj: LocationRate): Promise<any> {
    const url = this.serviceUrl + "/rateLocation";
    return this.http.post(url, obj);
  }
  fetchImageUploaded = (id: string): Promise<FileUploads[]> | FileUploads[] => {
    if (this.user) {
      return this.http
        .get(config.location_url + `/uploads/${id}`)
        .then((files: any) => {
          return files as FileUploads[];
        });
    }
    return [];
  };

    fetchThumbnailVideo = async (videoId: string): Promise<Thumbnail> => {
      const urlYutuServece = "http://localhost:8081";
      return this.http
        .get(
          urlYutuServece +
            `/tube/video/${videoId}&thumbnail,standardThumbnail,mediumThumbnail,maxresThumbnail,highThumbnail`
        )
        .then((thumbnail: any) => {
          return thumbnail.data as Thumbnail;
        });
    };
}
