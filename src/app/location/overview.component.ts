import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-overview",
    templateUrl:'./overview.html',
})
export default class OverviewComponent{
    constructor(public location: Location) {
    }
}