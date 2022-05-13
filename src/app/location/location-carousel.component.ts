import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FileUploads } from "../uploads/service";
import { LocationClient } from "./service/location";
import { Location } from "./service/location/location";
@Component({
    selector:'location-carousel',
    templateUrl:'./location-carousel.html',
    // styleUrls:['./style.css']
})
export class LocationCarouselComponent implements OnInit,OnChanges{
    constructor(private locationService:LocationClient){

    }
    @Input()edit!: (e: any, id: string) => void;
    @Input()location!:Location;
    carousel = false;
    files:FileUploads[]|undefined;
    ngOnInit(): void {
        this.handleFetch();
    }
    ngOnChanges(changes: SimpleChanges): void {
      if(changes['location'].previousValue !== changes['location'].currentValue){
        this.handleFetch();
      }
    }
    toggleCarousel(event:MouseEvent, enable:boolean){
          event.preventDefault();
          this.carousel = enable;
          this.handleFetch();
    }
    async handleFetch(){
        if (!this.carousel || this.files) return;
        let res
        try {
          res = await this.locationService.fetchImageUploaded(this.location.id);
        } catch (error) {
    
        }
        if (res && res.length > 0) {
          for (const item of res) {
            if (item.type === "youtube") {
              const thumbnails = await this.locationService.fetchThumbnailVideo(
                item.url
              );
              item.thumbnail = thumbnails.thumbnail;
              item.standardThumbnail = thumbnails.standardThumbnail;
              item.mediumThumbnail = thumbnails.mediumThumbnail;
              item.maxresThumbnail = thumbnails.maxresThumbnail;
              item.hightThumbnail = thumbnails.hightThumbnail;
            }
          }
          this.files = res;
        } else {
          const info: FileUploads[] = [
            {
              source: "",
              type: "image",
              url: this.location.imageURL || "",
            },
          ];
          this.files = info;
        }
      };
}