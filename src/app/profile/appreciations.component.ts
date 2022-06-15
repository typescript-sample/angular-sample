

import { Appreciation } from './appreciation/index';
import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-appreciations',
    templateUrl: './appreciations.html',
    styleUrls: ['./rate.css']
  })
export class Appreciations implements OnInit {
    @Output() moreAppreciate = new EventEmitter();
    @Output() reLoadData: EventEmitter<any> = new EventEmitter<any>();
    @Input() appreciations: Appreciation[] = [] as any;

    ngOnInit(): void {

    }

    moreAppreciateEmit = (event: any) => {
        event.preventDefault();
        this.moreAppreciate.emit();
    };

    reLoadDataEmit = () => {
        this.reLoadData.emit();
    }

}