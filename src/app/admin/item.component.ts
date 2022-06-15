import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditComponent } from 'angularx';

import { emailOnBlur, handleError, inputEdit, numberOnFocus, phoneOnBlur, requiredOnBlur } from 'uione';
import { MasterDataClient } from './service/master-data';
import { Item, ItemClient } from './service/item';
@Component({
  selector: 'app-item-detail',
  templateUrl: './item.html',
  providers: [ItemClient]
})
export class ItemComponent extends EditComponent<Item, string> implements OnInit {
  constructor(viewContainerRef: ViewContainerRef, route: ActivatedRoute, itemService: ItemClient, protected masterDataService: MasterDataClient) {
    super(viewContainerRef, route, itemService, inputEdit());
  }
  item: Item = {} as any;

  ngOnInit() {
    this.onInit();
  }
  requiredOnBlur(event: any) {
    requiredOnBlur(event);
  }

  getModelName(): string {
    return 'item';
  }

}
