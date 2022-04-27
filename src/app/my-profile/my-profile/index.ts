import { HttpRequest } from '@/app/shared/HttpRequest';
import {config} from '@/config';
import { Injectable } from '@angular/core';
import { options, storage } from 'uione';
import { Client } from 'web-clients';
import { MyProfileService, User, UserFilter, userModel, UserService, UserSettings } from './user';

export * from './user';

@Injectable()
export class UserClient extends Client<User, string, UserFilter> implements UserService {
  constructor(http: HttpRequest) {
    super(http, config.user_url, userModel);
    this.searchGet = true;
    this.getUsersByRole = this.getUsersByRole.bind(this);
  }
  getUsersByRole(id: string): Promise<User[]> {
    const url = `${this.serviceUrl}?roleId=${id}`;
    return this.http.get<User[]>(url);
  }
}

@Injectable()
export class MyProfileClient implements MyProfileService {
  constructor(private http: HttpRequest) {
    this.getMyProfile = this.getMyProfile.bind(this);
    this.getMySettings = this.getMySettings.bind(this);
    this.saveMySettings = this.saveMySettings.bind(this);
  }
  getMyProfile(id: string): Promise<User | null> {
    const url = config.myprofile_url + '/' + id;
    return this.http.get<User>(url).catch(err => {
      const data = (err && err.response) ? err.response : err;
      if (data && (data.status === 404 || data.status === 410)) {
        return null;
      }
      throw err;
    });
  }
  getMySettings(id: string): Promise<UserSettings | null> {
    const url = config.myprofile_url  + '/' + id + '/settings';
    return this.http.get<UserSettings>(url).catch(err => {
      const data = (err && err.response) ? err.response : err;
      if (data && (data.status === 404 || data.status === 410)) {
        return null;
      }
      throw err;
    });
  }

  saveMySettings(id: string, data: UserSettings): Promise<number> {
    return this.http.patch<number>(config.myprofile_url , { settings: data, id }).catch(err => {
      const data = (err && err.response) ? err.response : err;
      if (data && (data.status === 404 || data.status === 410)) {
        return 0;
      }
      throw err;
    });
  }
  saveMyProfile(id: string, data: User): Promise<number> {
    return this.http.patch<number>(config.myprofile_url , data).catch(err => {
      const data = (err && err.response) ? err.response : err;
      if (data && (data.status === 404 || data.status === 410)) {
        return 0;
      }
      throw err;
    });
  }

}
// export interface Config {
//   myprofile_url: string;
// }
// class ApplicationContext {
//   userService?: MyProfileService;
//   getConfig(): Config {
//     return storage.config();
//   }
//   getMyProfileService(): MyProfileService {
//     console.log('service')
//     if (!this.userService) {
//       const c = this.getConfig();
//       this.userService = new MyProfileClient(httpRequest, c.myprofile_url);
//     }
//     return this.userService;
//   }

// }

// export const context = new ApplicationContext();
// export function useGetMyProfileService(): MyProfileService {
//   const [service] = useState(() => { return context.getMyProfileService() })
//   return service;
// }
