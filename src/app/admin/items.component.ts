import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { navigate, SearchComponent } from 'angularx';
import { inputSearch } from 'uione';
import { MasterDataClient } from './service/master-data';
import { Item, ItemClient, ItemFilter } from './service/item';

@Component({
  selector: 'app-item-list',
  templateUrl: './items.html',
  providers: [ItemClient]
})
export class ItemsComponent extends SearchComponent<Item, ItemFilter> implements OnInit {
  constructor(viewContainerRef: ViewContainerRef, protected router: Router, itemService: ItemClient, protected masterDataService: MasterDataClient) {
    super(viewContainerRef, itemService, inputSearch());
  }
  statusList: any = [];
  viewable: boolean = true;
  addable: boolean = true;
  editable: boolean = true;
  ngOnInit() {
    this.hideFilter=true;
    this.onInit();
  }
  edit(itemId: string) {
    navigate(this.router, 'admin/items/edit', [itemId]);
  }
  add() {
    navigate(this.router, 'admin/items/add');
  }

}
