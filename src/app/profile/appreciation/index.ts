// import { HttpRequest } from 'axios-core';
import { HttpRequest } from '@/app/shared/HttpRequest';
import { Client } from 'web-clients';
import { Appreciation, AppreciationFilter, appreciationModel, AppreciationService, UsefulAppreciation } from './appreciation';
import { Injectable } from '@angular/core';
import {config} from '@/config';

export * from './appreciation';
@Injectable()

export class AppreciationClient extends Client<Appreciation, string, AppreciationFilter> implements AppreciationService {
  constructor(http: HttpRequest) {
    super(http, config.appreciation_url, appreciationModel);
    this.searchGet = true;
    this.usefulAppreciation = this.usefulAppreciation.bind(this)
  }

//   postOnly(s: AppreciationFilter): boolean {
//     return true;
//   }

  usefulAppreciation(obj: UsefulAppreciation): Promise<number> {
    const url = config.appreciation_url + '/useful'
    return this.http.post<number>(url, obj).catch(err => {
      const data = (err && err.response) ? err.response : err;
      if (data && (data.status === 404 || data.status === 410)) {
        return 0;
      }
      throw err;
    });
  }
}
