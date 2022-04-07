import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {navigate} from '@/app/common';
import {storage} from 'uione';

@Component({
  selector: 'app-main',
  templateUrl: './main.html',
  // styleUrls: [
  //       '../css/angular-material-override.css',
  //       '../css/mine.css',
  //       '../css/custome-style.css',
  //       '../css/mine-mobile.css',
  //       '../css/theme-mobile.css'
  //       ]
  // providers: [SignoutServiceImpl],
})
export class MainComponent implements OnInit {
  constructor(protected router: Router) {
    // this.signoutService = signoutService;
  }
  resource = storage.getResource();
  logInUser: any = {userId: 1};
  isShowSearchResult = false;
  forms: any;
  privileges: any;
  isToggleSidebar: false;
  isToggleMenu: false;
  isToggleSearch: false;
  pinnedModules = [];

  // signoutService: SignoutService;
  se: any = {};
  pageSize = 10;
  pageSizes = [10, 20, 40, 60, 100, 200, 400, 10000];
  public classProfile: any = '';

  ngOnInit() {
    this.privileges = storage.privileges();
  }

  searchOnClick() {
    alert('test');
  }

  toggleMenuProfile() {
    this.classProfile = this.classProfile === 'show' ? '' : 'show';
  }

  signout() {
    /*
    this.signoutService.signout(GlobalApps.getUserName()).subscribe(success => {
      if (success === true) {
        navigate(this.router, 'signin');
      }
    }, err => {
      this.handleError(err);
    });
    */
    /*
     const url = config.authenticationServiceUrl + '/authentication/signout/' + GlobalApps.getUserName();
     WebClientUtil.get(this.http, url).subscribe(
       success => {
         if (success) {
           sessionStorage.setItem('authService', null);
           sessionStorage.clear();
           GlobalApps.setUser(null);
           navigate(this.router, 'signin');
         }
       },
       err => this.handleError(err)
     );
     */
    sessionStorage.setItem('authService', null);
    sessionStorage.clear();
    storage.setUser(null);
    navigate(this.router, 'signin');
  }

  toggleMenuItem = (event) => {
    let target = event.currentTarget;
    const currentTarget = event.currentTarget;
    const elI = currentTarget.querySelectorAll('.menu-item > i')[1];
    if (elI) {
      if (elI.classList.contains('down')) {
        elI.classList.remove('down');
        elI.classList.add('up');
      } else {
        if (elI.classList.contains('up')) {
          elI.classList.remove('up');
          elI.classList.add('down');
        }
      }
    }
    if (currentTarget.nextElementSibling) {
      currentTarget.nextElementSibling.classList.toggle('expanded');
    }
    if (target.nodeName === 'A') {
      target = target.parentElement;
    }
    if (target.nodeName === 'LI') {
      target.classList.toggle('open');
    }
  }

  onMouseHover = (e) => {
    e.preventDefault();
    const sysBody = (window as any).sysBody;
    if (sysBody.classList.contains('top-menu') && window.innerWidth > 768) {
      const navbar = Array.from(document.querySelectorAll('.sidebar>nav>ul>li>ul.expanded'));
      const icons = Array.from(document.querySelectorAll('.sidebar>nav>ul>li>a>i.up'));
      if (navbar.length > 0) {
        for (let i = 0; i < navbar.length; i++) {
          navbar[i].classList.toggle('expanded');
          if (icons[i]) {
            icons[i].className = 'entity-icon down';
          }
        }
      }
    }
  }
  onShowAllMenu = (e) => {
    e.preventDefault();
    const sysBody = (window as any).sysBody;
    if (sysBody.classList.contains('top-menu2')) {
      const navbar = Array.from(document.querySelectorAll('.sidebar>nav>ul>li>ul.list-child'));
      const icons = Array.from(document.querySelectorAll('.sidebar>nav>ul>li>a>i.down'));
      if (navbar.length > 0) {
        let i = 0;
        for (i = 0; i < navbar.length; i++) {
          navbar[i].className = 'list-child expanded';
          if (icons[i]) {
            icons[i].className = 'entity-icon up';
          }
        }
      }
    }
  }
  onHideAllMenu = (e) => {
    e.preventDefault();
    const sysBody = (window as any).sysBody;
    if (sysBody.classList.contains('top-menu2')) {
      const navbar = Array.from(document.querySelectorAll('.sidebar>nav>ul>li>ul.expanded'));
      const icons = Array.from(document.querySelectorAll('.sidebar>nav>ul>li>a>i.up'));
      if (navbar.length > 0) {
        let i = 0;
        for (i = 0; i < navbar.length; i++) {
          navbar[i].className = 'list-child';
          if (icons[i]) {
            icons[i].className = 'entity-icon down';
          }
        }
      }
    }
  }

  pinModulesHandler (event, index, moduleOrder) {
    event.stopPropagation();
    if ( this.privileges.find( (module) => module.order === moduleOrder)) {
      const removedModule = this.privileges.splice(index, 1);
      this.pinnedModules.push(removedModule[0]);
      this.privileges.sort( (moduleA, moduleB) => moduleA.order - moduleB.order);
    } else {
      const removedModule = this.pinnedModules.splice(index, 1);
      this.privileges.push(removedModule[0]);
      this.privileges.sort( (moduleA, moduleB) => moduleA.order - moduleB.order);
    }
  }

  routeIsActive(routePath: string, params: any) {
    //  let currentRoute = this.router.urlTree.firstChild(this.router.urlTree.root);
    //  // e.g. 'Login' or null if route is '/'
    //  let segment = !currentRoute ? '/' : currentRoute.segment;
    //  return  segment == routePath;
    return false;
  }

  gotoURL(url) {
    navigate(this.router, url);
  }

  activeWithPath(path) {
    return this.router.url === path ? 'active' : '';
  }

  gotoUserList() {
    navigate(this.router, 'users');
  }

  gotoAccessGroupList() {
    navigate(this.router, 'access/accessGroup/search');
  }

  gotoPayerList() {
    navigate(this.router, 'setup/payer/search');
  }

  gotoPayeeList() {
    navigate(this.router, 'setup/payee/search');
  }

  gotoBankList() {
    navigate(this.router, 'setup/bank/search');
  }

  gotoPaymentAccountList() {
    navigate(this.router, 'setup/paymentAccount/search');
  }

  gotoReceivingAccountList() {
    navigate(this.router, 'setup/receivingAccount/search');
  }

  gotoUserActivityList() {
    navigate(this.router, 'reporting-engine/user-activity-log');
  }

  gotoTransactionlogList() {
    navigate(this.router, 'reporting-engine/transaction-log');
  }

  gotoWebTransLogList() {
    navigate(this.router, 'reporting-engine/web-trans-log');
  }

  gotoAccessRoleAssignmentList() {
    navigate(this.router, 'access/accessRole/search');
  }

  gotoCurrentUser() {
    navigate(this.router, 'user', this.logInUser.userId);
  }

  changeMyPassword() {
    navigate(this.router, 'mypassword');
  }

  viewMyProfile() {
    navigate(this.router, 'myprofile');
  }

  viewMySettings() {
    navigate(this.router, 'mysettings');
  }

  gotoExternalSystemList() {
    navigate(this.router, 'setup/external-system/search');
  }

  gotoEntityRelationshipList() {
    navigate(this.router, 'setup/entity-relationship/search');
  }
}
