// import { HttpRequest } from 'axios-core';
import { Client } from 'web-clients';
import { Article, ArticleFilter, articleModel, ArticleService } from './article';
import { HttpRequest } from '@/app/shared/HttpRequest';
import {config} from '@/config';
import { Injectable } from '@angular/core';

export * from './article';
@Injectable()
export class ArticleClient extends Client<Article, string, ArticleFilter> implements ArticleService {
  constructor(http: HttpRequest) {
    super(http, config.article_url, articleModel);
    // this.searchGet = true;
  }

  postOnly(s: ArticleFilter): boolean {
    return true;
  }
  
}


