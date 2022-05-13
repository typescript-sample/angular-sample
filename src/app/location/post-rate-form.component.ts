import { StringMap } from "@angular/compiler/src/compiler_facade_interface";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { getResource, storage, UserAccount } from "uione";
import { LocationClient } from "./service/location";
import { LocationRate } from "./service/location-rate/location-rate";

@Component({
    selector: 'app-post-rate',
    templateUrl: './post-rate-form.html',
    styleUrls: ['./rate.css']

})
export default class PostRateFormComponent implements OnInit {
    @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
    @Output() loadData:EventEmitter<any> = new EventEmitter<any>();
    @Input() location: any;
    @Input()value:number|undefined;
    constructor(private locationService: LocationClient) {
        this.resource = storage.resource().resource();
    }
    onCloseModal(index: any) {
        this.closeModal.emit(index);
    };
    resource: StringMap;
    review = "";
    ngOnInit(): void {

    }
    fakeArray(value: number | undefined): number[] {
        if (!value) return [];
        return Array.from(Array(value).keys()).map(i => i + 1);
    }

    getRateStarClass(value: number = 0) {
        const listClass = ['rv-star3'];
        for (let i = 1; i <= value; i++) {
            listClass.push(`star-${i}`);
        }
        const longClass = listClass.join(" ");
        
        return longClass;
    };

    handleChange(event: any) {
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        this.review = value;
    };
    async postReview (event: any){
        try {
            event.preventDefault();
            const user: UserAccount = JSON.parse(sessionStorage.getItem('authService') || '{}') as UserAccount;
            const locationRate: LocationRate = {};
            locationRate.locationId = this.location.id;
            locationRate.userId = user.id;
            locationRate.rate = this.value;
            locationRate.review = this.review;
            locationRate.rateTime = new Date();
            const res = await this.locationService.rateLocation(locationRate);
            storage.message("Your review is submited");
            this.onCloseModal(1);
            this.loadData.emit();
        } catch (err) {
            storage.alert("error");
        }
    };
}