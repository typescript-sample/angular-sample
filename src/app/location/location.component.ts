import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LocationFormComponent } from "./location-form.component";
import LocationPageComponent from "./location-page.component";
import { LocationsFormComponent } from "./locations-form.component";
// import { LocationForm } from "./location-form.component";

@Component({
    selector:'app-location-module',
    template:'<router-outlet></router-outlet>'
})
export class LocationComponent{
    constructor(){}
}

const locationRoutes:Routes = [
    {
        path:'',
        component:LocationComponent,
        children:[
            {path:'', component:LocationsFormComponent},
            {path:':id', component:LocationPageComponent},
            {path:':id/review', component:LocationPageComponent},
            {path:'edit/:id', component:LocationFormComponent},
            {path:'add', component:LocationFormComponent}
        ]
    }
]

@NgModule({
    imports:[
        RouterModule.forChild(locationRoutes)
    ],
    declarations:[],
    exports:[
        RouterModule
    ]
})
export class LocationRoutes{}