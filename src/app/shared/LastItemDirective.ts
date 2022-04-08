import {Directive, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Directive({ selector: '[appLastItem]' })
export class LastItemDirective implements OnInit {
  @Input() isLast: boolean;
  @Output() lastDone: EventEmitter<boolean> = new EventEmitter<boolean>();
  ngOnInit() {
    if (this.isLast) {
      this.lastDone.emit(true);
    }
  }
}
