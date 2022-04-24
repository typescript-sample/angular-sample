import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { resources } from './common';
import * as csv from 'csvtojson';
import { currency, locale } from 'locale-service';
// import * as moment from 'moment';
import { phonecodes } from 'phonecodes';
import { alert, confirm } from 'ui-alert';
import { loading } from 'ui-loading';
import { UIService, formatFax, formatNumber, formatPhone, resources as uiresources } from 'ui-plus';
import { toast } from 'ui-toast';
import { storage } from 'uione';
import { resources as vresources } from 'validation-core';
import { DefaultCsvService, resources as clientresources } from 'web-clients';
// import {Error404Component} from './core/error404/error-404.component';
// import {AuthenticationService} from './shared/AuthenticationService';
// import {MainComponent} from './shared/main.component';
import { resources as locales } from './shared/resources';

function parseDate(value: string, format: string): Date | null | undefined {
  if (!format || format.length === 0) {
    format = 'MM/DD/YYYY';
  } else {
    format = format.toUpperCase();
  }  
  const dateItems = format.split(/\.|\ |\-/);
  const valueItems = value.split(/\.|\ |\-/);
  let monthIndex  = dateItems.indexOf("M");
  let dayIndex    = dateItems.indexOf("D");
  let yearIndex   = dateItems.indexOf("YYYY");
  if(monthIndex==-1){
    monthIndex  = dateItems.indexOf("MM");
  }
  if(dayIndex==-1){
    dayIndex  = dateItems.indexOf("DD");
  }
  if(yearIndex==-1){
    yearIndex  = dateItems.indexOf("YY");
  }
  const month=parseInt(valueItems[monthIndex])-1;
  let year=parseInt(valueItems[yearIndex]);
  if(year<100)year+=2000;
  const day=parseInt(valueItems[dayIndex]);  
  const formatedDate = new Date(year,month,day);
  return formatedDate;
}

@Component({
  selector: 'app-root',
  template: '<div><router-outlet></router-outlet></div>',
})
export class AppComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
    clientresources.csv = new DefaultCsvService(csv);
    storage.authentication = '/signin';
    storage.home = 'admin/users';
    storage.setResources(locales);
    storage.setLoadingService(loading);
    storage.setUIService(new UIService());

    storage.currency = currency;
    storage.locale = locale;
    storage.alert = alert;
    storage.confirm = confirm;
    storage.message = toast;

    vresources.phonecodes = phonecodes;
    uiresources.date = parseDate;
    uiresources.currency = currency;
    uiresources.resource = storage.resource();
    resources.formatPhone = formatPhone;
    resources.formatFax = formatFax;
    resources.currency = currency;
    resources.formatNumber = formatNumber;
    if (location.href.startsWith(storage.getRedirectUrl())) {
      window.location.href = location.origin + '/connect/oauth2' + location.search;
    }

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}

