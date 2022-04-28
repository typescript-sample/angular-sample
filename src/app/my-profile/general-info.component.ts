import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getResource } from 'uione';
import './general-info.css';
import { MyProfileClient, User } from './my-profile';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.html',
  styleUrls: ['./general-info.css']
})
export class GeneralInfoComponent implements OnInit {
  @Input() resource: any;
  @Input() user: User = {} as any;
  // @Input() close: any;
  // @Input() saveEmit: any;
  @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeModalFn:EventEmitter<any> = new EventEmitter<any>();
  constructor(private service: MyProfileClient) {

  }
  userModal: User = {} as any;
  ngOnInit(): void {
    this.resource = getResource().resource();
    this.userModal=this.user;
  }
  save(event: any) {
    event.preventDefault();
    const id = 'XU3rkqafp';
    this.service.saveMyProfile(id, this.user).then(success => {
      let status = '';
      if (success) {
        status = 'success';
      } else {
        status = 'fail';
      }
      this.onSave.emit({ status, user:this.user });
      this.closeModalFn.emit();
    })
    
  }
}

