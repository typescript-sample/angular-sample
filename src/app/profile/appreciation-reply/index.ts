// import { HttpRequest } from 'axios-core';
import { Client } from 'web-clients';
import { Appreciation, UsefulAppreciation } from '../appreciation';
import { AppreciationReply, AppreciationReplyFilter, appreciationReplyModel, AppreciationReplyService, Result } from './appreciation-reply';
import { Injectable } from '@angular/core';
import { HttpRequest } from '@/app/shared/HttpRequest';
import {config} from '@/config';

export * from './appreciation-reply';
@Injectable()
export class AppreciationReplyClient extends Client<AppreciationReply, string, AppreciationReplyFilter> implements AppreciationReplyService {
  constructor(http: HttpRequest) {
    super(http, config.appreciation_reply_url, appreciationReplyModel);
    this.searchGet = true;
  }
  insertReply(obj: Appreciation): Promise<Result<Appreciation>> {
    const url = this.serviceUrl;
    return this.http.post<Result<Appreciation>>(url, obj);
  }
  usefulAppreciation(obj: UsefulAppreciation): Promise<number> {
    const url = config.appreciation_reply_url + '/useful'
    return this.http.post<number>(url, obj).catch(err => {
      const data = (err && err.response) ? err.response : err;
      if (data && (data.status === 404 || data.status === 410)) {
        return 0;
      }
      throw err;
    });
  }
}
