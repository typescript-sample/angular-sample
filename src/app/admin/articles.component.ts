import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { navigate, SearchComponent } from 'angularx';
import { inputSearch } from 'uione';
import { MasterDataClient } from './service/master-data';
import { Article, ArticleClient, ArticleFilter } from './service/article';

@Component({
  selector: 'app-article-list',
  templateUrl: './articles.html',
  providers: [ArticleClient]
})
export class ArticlesComponent extends SearchComponent<Article, ArticleFilter> implements OnInit {
  constructor(viewContainerRef: ViewContainerRef, protected router: Router, articleService: ArticleClient, protected masterDataService: MasterDataClient) {
    super(viewContainerRef, articleService, inputSearch());
  }
  statusList: any = [];
  viewable: boolean = true;
  addable: boolean = true;
  editable: boolean = true;
  ngOnInit() {
    this.hideFilter=true;
    this.onInit();
  }
  edit(articleId: string) {
    navigate(this.router, 'admin/articles/edit', [articleId]);
  }
  add() {
    navigate(this.router, 'admin/articles/add');
  }
  // async load(s: ArticleFilter, autoSearch: boolean) {
  //   Promise.all([
  //     this.masterDataService.getStatus()
  //   ]).then(values => {
  //     const [statusList] = values;
  //     this.statusList = statusList;
  //     super.load(s, autoSearch);
  //   }).catch(handleError);
  // }
}
