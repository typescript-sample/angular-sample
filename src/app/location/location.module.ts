import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { ModalModule } from "../shared/modal/modal.module";
import { LocationCarouselComponent } from "./location-carousel.component";
import { LocationFormComponent } from "./location-form.component";
import LocationHomeComponent from "./location-page.component";
import { LocationComponent, LocationRoutes } from "./location.component";
import { LocationsFormComponent } from "./locations-form.component";
import OverviewComponent from "./overview.component";
import PostRateFormComponent from "./post-rate-form.component";
import ReviewComponent from "./review.component";
import { LocationClient } from "./service/location";
import { LocationRateClient } from "./service/location-rate";

@NgModule({
    imports:[
        CommonModule,
        LocationRoutes,
        FormsModule,
        ReactiveFormsModule,
        ModalModule,
        PaginationModule.forRoot()
    ],
    declarations:[
        LocationComponent,
        LocationsFormComponent,
        LocationHomeComponent,
        ReviewComponent,
        OverviewComponent,
        PostRateFormComponent,
        LocationCarouselComponent,
        LocationFormComponent
    ],
    entryComponents:[],
    providers:[
        LocationClient,
        LocationRateClient
    ]
})
export class LocationModule{}