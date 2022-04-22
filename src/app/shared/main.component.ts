import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { navigate } from '@/app/common';
import { user as getUser, storage, UserAccount } from 'uione';

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
  sysBody: HTMLElement | null | undefined;
  resource = storage.getResource();
  logInUser: any = { userId: 1 };
  isShowSearchResult = false;
  forms: any;
  privileges: any;
  isToggleSidebar: boolean;
  isToggleMenu: boolean;
  isToggleSearch: boolean;
  pinnedModules: any = [];
  isMenu: boolean;
  DarkMode: boolean;
  isPinned: boolean;
  classicMenu: boolean;
  // signoutService: SignoutService;
  se: any = {};
  pageSize = 10;
  pageSizes = [10, 20, 40, 60, 100, 200, 400, 10000];
  public classProfile: any = '';
  username: string = '';
  user: UserAccount = getUser();
  ngOnInit() {
    this.privileges = storage.privileges();
    this.isMenu = false;
    this.DarkMode = false;
    this.isToggleSidebar = false;
    this.isToggleMenu = false;
    this.isToggleSearch = false;
    const usr = storage.user();
    this.username = usr.displayName && usr.displayName.length > 0 ? usr.displayName : (usr.username && usr.username.length > 0 ? usr.username : this.resource.my_profile);

  }

  searchOnClick() {
    // alert('test');
  }
  toggleSidebar() {
    this.isToggleSidebar = !this.isToggleSidebar;

  }
  changeClassicMenu() {
    if (!this.sysBody) {
      this.sysBody = document.getElementById('sysBody');
    }
    if (this.sysBody) {
      if (this.sysBody.classList.contains('classic')) {
        this.sysBody.classList.remove('classic');
        this.classicMenu = true;
      } else {
        this.sysBody.classList.add('classic');
        this.classicMenu = false;
      }
    }
  };
  toggleMenuProfile() {
    if (!this.logInUser) {
      navigate(this.router, 'signin');
    }
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
    navigate(this.router, '');
  }
  isClassicMenu(): boolean {
    if (!this.sysBody) {
      this.sysBody = document.getElementById('sysBody');
    }
    if (this.sysBody) {
      if (this.sysBody.classList.contains('classic')) {
        return true;
      }
    }
    return false;
  }
  changeMenu() {
    if (!this.sysBody) {
      this.sysBody = document.getElementById('sysBody');
    }
    if (this.sysBody) {
      if (this.sysBody.classList.contains('top-menu')) {
        this.sysBody.classList.remove('top-menu');
        this.isMenu = true;
      } else {
        this.sysBody.classList.add('top-menu');
        this.isMenu = false;
      }
    }
  }
  changeMode() {
    if (!this.sysBody) {
      this.sysBody = document.getElementById('sysBody');
    }
    if (this.sysBody) {
      const parent = this.sysBody.parentElement;
      if (parent) {
        if (parent.classList.contains('dark')) {
          parent.classList.remove('dark');
          this.DarkMode = false;
        } else {
          parent.classList.add('dark');
          this.DarkMode = true;
        }
      }
    }
  }
  isTopMenu(): boolean {
    if (!this.sysBody) {
      this.sysBody = document.getElementById('sysBody');
    }
    if (this.sysBody) {
      if (this.sysBody.classList.contains('top-menu')) {
        return true;
      }
    }
    return false;
  }

  isDarkMode(): boolean {
    if (!this.sysBody) {
      this.sysBody = document.getElementById('sysBody');
    }
    if (this.sysBody) {
      const parent = this.sysBody.parentElement;
      if (parent) {
        if (parent.classList.contains('dark')) {
          return true;
        }
      }
    }
    return false;
  }
  toggleMenuItem = (event: any) => {
    event.preventDefault();
    let target: HTMLElement | null = event.currentTarget;
    const currentTarget = event.currentTarget;
    const nul = currentTarget.nextElementSibling;
    if (nul) {
      const elI = currentTarget.querySelectorAll('.menu-item > i.entity-icon');
      if (nul.classList.contains('expanded')) {
        nul.classList.remove('expanded');
        if (elI && elI.length > 0) {
          elI[0].classList.add('up');
          elI[0].classList.remove('down');
        }
      } else {
        nul.classList.add('expanded');
        if (elI && elI.length > 0) {
          elI[0].classList.remove('up');
          elI[0].classList.add('down');
        }
      }
    }
    if (target.nodeName === 'A') {
      target = target.parentElement;
    }
    if (target && target.nodeName === 'LI') {
      target.classList.toggle('open');
    }
    const parent = this.findParent(currentTarget, 'NAV');
    if (parent) {
      setTimeout(() => {
        if (this.isExpandedAll(parent)) {
          parent.classList.remove('collapsed-all');
          parent.classList.add('expanded-all');
        } else if (this.isCollapsedAll(parent)) {
          parent.classList.remove('expanded-all');
          parent.classList.add('collapsed-all');
        } else {
          parent.classList.remove('expanded-all');
          parent.classList.remove('collapsed-all');
        }
      }, 0);
    }
  }
  // onMouseHover = (e: any) => {
  //   e.preventDefault();
  //   const sysBody = (window as any).sysBody;
  //   if (sysBody.classList.contains('top-menu') && window.innerWidth > 768) {
  //     const navbar = Array.from(document.querySelectorAll('.sidebar>nav>ul>li>ul.expanded'));
  //     const icons = Array.from(document.querySelectorAll('.sidebar>nav>ul>li>a>i.up'));
  //     if (navbar.length > 0) {
  //       for (let i = 0; i < navbar.length; i++) {
  //         navbar[i].classList.toggle('expanded');
  //         if (icons[i]) {
  //           icons[i].className = 'entity-icon down';
  //         }
  //       }
  //     }
  //   }
  // }

  findParent(ele: HTMLElement, node: string): HTMLElement | null {
    let current: HTMLElement | null = ele;
    while (true) {
      current = current.parentElement;
      if (!current) {
        return null;
      }
      if (current.nodeName === node) {
        return current;
      }
    }
  }
  isCollapsedAll(parent: HTMLElement): boolean {
    const navbar = Array.from(parent.querySelectorAll('.sidebar>nav>ul>li>ul.list-child'));
    if (navbar.length > 0) {
      let i = 0;
      for (i = 0; i < navbar.length; i++) {
        if (navbar[i].classList.contains('expanded')) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
  isExpandedAll(parent: HTMLElement): boolean {
    const navbar = Array.from(parent.querySelectorAll('.sidebar>nav>ul>li>ul.list-child'));
    if (navbar.length > 0) {
      let i = 0;
      for (i = 0; i < navbar.length; i++) {
        if (!navbar[i].classList.contains('expanded')) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
  expandAll(e: any) {
    e.preventDefault();
    const parent = this.findParent(e.currentTarget, 'nav');
    if (parent) {
      parent.classList.remove('collapsed-all');
      parent.classList.add('expanded-all');
      const navbar = Array.from(parent.querySelectorAll('.sidebar>nav>ul>li>ul.list-child'));
      if (navbar.length > 0) {
        const icons = Array.from(parent.querySelectorAll('i.up'));
        let i = 0;
        for (i = 0; i < navbar.length; i++) {
          navbar[i].className = 'list-child expanded';
        }
        for (i = 0; i < icons.length; i++) {
          icons[i].className = 'entity-icon down';
        }
      }
    }
  }
  onShowAllMenu = (e: any) => {
    e.preventDefault();
    const parent = this.findParent(e.currentTarget, 'NAV');
    if (parent) {
      parent.classList.add('expanded-all');
      parent.classList.remove('collapsed-all');
      const navbar = Array.from(parent.querySelectorAll('.sidebar>nav>ul>li>ul.list-child'));
      if (navbar.length > 0) {
        const icons = Array.from(parent.querySelectorAll('i.up'));
        let i = 0;
        for (i = 0; i < navbar.length; i++) {
          navbar[i].className = 'list-child expanded';
        }
        for (i = 0; i < icons.length; i++) {
          icons[i].className = 'entity-icon down';
        }
      }

    }
  }

  onHideAllMenu = (e: any) => {
    e.preventDefault();
    const parent = this.findParent(e.currentTarget, 'NAV');
    if (parent) {
      parent.classList.add('collapsed-all');
      parent.classList.remove('expanded-all');
      const navbar = Array.from(parent.querySelectorAll('.sidebar>nav>ul>li>ul.expanded'));
      if (navbar.length > 0) {
        const icons = Array.from(parent.querySelectorAll('i.down'));
        let i = 0;
        for (i = 0; i < navbar.length; i++) {
          navbar[i].className = 'list-child';
        }
        for (i = 0; i < icons.length; i++) {
          icons[i].className = 'entity-icon up';
        }
      }

    }
  }

  pinModulesHandler(event: any, index: any, moduleOrder: any) {
    event.stopPropagation();
    if (
      this.privileges.find(
        (module: any) => module.sequence === moduleOrder)
    ) {
      const removedModule = this.privileges.splice(index, 1);
      this.pinnedModules.push(removedModule[0]);
      this.privileges.sort(
        (moduleA: any, moduleB: any) => moduleA.sequence - moduleB.sequence
      );
    } else {
      if (this.pinnedModules.length > 0) {
        const removedModule = this.pinnedModules.splice(index, 1);
        this.privileges.push(removedModule[0]);
        this.privileges.sort((moduleA: any, moduleB: any) => moduleA.sequence - moduleB.sequence);
      }

    }
  }

  routeIsActive(routePath: string, params: any) {
    //  let currentRoute = this.router.urlTree.firstChild(this.router.urlTree.root);
    //  // e.g. 'Login' or null if route is '/'
    //  let segment = !currentRoute ? '/' : currentRoute.segment;
    //  return  segment == routePath;
    return false;
  }
  toggleMenu() {

    this.isToggleMenu = !this.isToggleMenu;
  }
  gotoURL(url: string) {
    navigate(this.router, url);
  }

  activeWithPath(path: string) {
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
    navigate(this.router, 'my-profile');
  }

  viewMySettings() {
    navigate(this.router, 'my-profile/settings');
  }

  gotoExternalSystemList() {
    navigate(this.router, 'setup/external-system/search');
  }

  gotoEntityRelationshipList() {
    navigate(this.router, 'setup/entity-relationship/search');
  }
}
