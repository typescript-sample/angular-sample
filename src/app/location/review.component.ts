import { StringMap } from "@angular/compiler/src/compiler_facade_interface";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { buildId } from "angularx";
import * as moment from "moment";
import { getResource, ResourceService } from "uione";
import { ModalComponent } from "../shared/modal/modal.component";
import { LocationClient } from "./service/location";
import { LocationRateClient } from "./service/location-rate";
import { LocationRate, LocationRateFilter } from "./service/location-rate/location-rate";
import { Location, LocationInfo } from "./service/location/location";
@Component({
    selector: 'app-review',
    templateUrl: './review.html',
    styleUrls: ['./rate.css']
})
export default class ReviewComponent implements OnInit {
    @ViewChild('rateModal') rateModal?: ModalComponent ;
    constructor(private route: ActivatedRoute, private locationService: LocationClient, private locationRateService: LocationRateClient) {
        this.resource = getResource().resource();
    }
    customStyle = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        }
    };
    Math = Math;
    moment = moment;
    resource: StringMap;
    currClass = '';
    voteStar: number | undefined;
    isOpenRateModal = false;
    rateClassName: string | undefined;
    location: Location | undefined;
    rates: LocationRate[] = [];
    pageSize = 3;
    maxLengthReviewText = 65;
    id = buildId<string>(this.route);
    hasReview = window.location.pathname.includes('review');
    ngOnInit(): void {
        this.load();
    }
    async load() {
        const locationRateSM = new LocationRateFilter();
        if (this.id) {
            locationRateSM.locationId = this.id;
            locationRateSM.limit = this.pageSize;
            locationRateSM.sort = '-rateTime';
            const location = await this.locationService.load(this.id || '');
            const searchResult = await this.locationRateService.search(locationRateSM);
            this.rates = searchResult.list;
            this.rateClassName = 'rate';
            this.currClass = 'rate';
            if (location) this.location = location;
        }

    }
    handleOnClick(n: number): void {
       const newCurrClass = this.generateRatingClasses(n);
        this.currClass = newCurrClass;
        this.voteStar = n;
        // this.isOpenRateModal = true;
        this.rateModal?.open();
        this.rateClassName = this.currClass;
    }

    generateRatingClasses(n: number) {
        const classList = ['rate'];
        for (let i = 1; i <= n; i++) {
            classList.push(`star-${i}`);
        }        
        return classList.join(' ');
    }
    handleOnMouseLeave() {
        this.rateClassName = this.currClass;
    };
    handleOnMouseEnter(n: number) {
        const _rateClassName = this.generateRatingClasses(n);
        this.rateClassName = _rateClassName;
    };


    calculatorPercentStar(value: any) {
        return Number(value * 100 / 5)
    };
    getPercentAndNumberStar() {
        const list: Array<{ percent: number, numberStar: any[] }> = [];
        // if (this.location && !this.location.info) return;
        if (this.location && this.location.info) {
            const viewCount = this.location.info.viewCount;
            for (let i = 5; i > 0; i--) {
                const rate = `rate${i}`
                const value = this.location.info[rate as keyof LocationInfo];
                let percent: number = 0;
                if (viewCount !== 0) {
                    percent = Number(value || 0 * 100 / viewCount);
                }

                list.push({ percent: percent, numberStar: new Array(i) });
            }
        }
        return list;
    }
    fakeArray(value: number | undefined): number[] {
        if (!value) return [];
        return Array.from(Array(value).keys()).map(i => i + 1);
    }
    reviewStar(value: any): string {

        return Array.from(Array(value).keys()).map(i => `star-${i + 1}`).join(' ');

    }

    // closeModal(index: any) {
    //     if (index === 1) {
    //         this.isOpenRateModal = false;
    //         // loadData();
    //         this.load();
    //     }
    // }

    async moreReview(event: MouseEvent) {
        event.preventDefault();
        const locationRateSM = new LocationRateFilter();
        if (this.id) {
            locationRateSM.locationId = this.id;
            locationRateSM.limit = this.pageSize + 3;
            locationRateSM.sort = '-rateTime';
            const searchRates = await this.locationRateService.search(locationRateSM);
            this.rates = searchRates.list;
            this.rateClassName = 'rate';
            this.currClass = 'rate';
            this.pageSize += 3;
        }

    }




}