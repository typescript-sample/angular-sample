import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpRequest as BaseHttpRequest} from '@/app/common';
import {options} from 'uione';

@Injectable()
export class HttpRequest extends BaseHttpRequest {
  constructor(http: HttpClient) {
    super(http, options);
  }
}
