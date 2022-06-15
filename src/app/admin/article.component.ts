import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditComponent } from 'angularx';

import { emailOnBlur, handleError, inputEdit, numberOnFocus, phoneOnBlur, requiredOnBlur } from 'uione';
import { MasterDataClient } from './service/master-data';
import { Article, ArticleClient } from './service/article';
@Component({
  selector: 'app-article-detail',
  templateUrl: './article.html',
  providers: [ArticleClient]
})
export class ArticleComponent extends EditComponent<Article, string> implements OnInit {
  constructor(viewContainerRef: ViewContainerRef, route: ActivatedRoute, articleService: ArticleClient, protected masterDataService: MasterDataClient) {
    super(viewContainerRef, route, articleService, inputEdit());
  }
  article: Article = {} as any;

  ngOnInit() {
    this.onInit();
  }
  requiredOnBlur(event: any) {
    requiredOnBlur(event);
  }

  getModelName(): string {
    return 'article';
  }

}
