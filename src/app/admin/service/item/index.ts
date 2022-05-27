// import { HttpRequest } from 'axios-core';
import { Client } from 'web-clients';
import { Item, ItemFilter, itemModel, ItemService } from './item';
import { HttpRequest } from '@/app/shared/HttpRequest';
import {config} from '@/config';
import { Injectable } from '@angular/core';

export * from './item';
@Injectable()
export class ItemClient extends Client<Item, string, ItemFilter> implements ItemService {
  constructor(http: HttpRequest) {
    super(http, config.item_url, itemModel);
    // this.searchGet = true;
  }

  postOnly(s: ItemFilter): boolean {
    return true;
  }
  
}


