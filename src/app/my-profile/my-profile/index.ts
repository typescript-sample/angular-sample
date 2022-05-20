import { HttpRequest } from '@/app/shared/HttpRequest';
import {config} from '@/config';
import { Injectable } from '@angular/core';
import { Client, QueryClient } from 'web-clients';
import { QueryService } from 'onecore';
import { MyProfileService, User, UserFilter, userModel, UserService, UserSettings } from './user';
import axios from 'axios';
import { HttpRequest as HttpRequestAxios } from 'axios-core';


export * from './user';

const httpRequest = new HttpRequestAxios(axios);

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
class ApplicationContext {
  // userService?: MyProfileService;
  lookingForService?: QueryService<string>;
  interestService?: QueryService<string>;
  skillService?: QueryService<string>;

  getLookingForService(): QueryService<string> {
    
    if (!this.lookingForService) {
      this.lookingForService = new QueryClient<string>(httpRequest, config.looking_for_url);
    }
    return this.lookingForService;
  }

  getInterestService(): QueryService<string> {
    
    if (!this.interestService) {
      this.interestService = new QueryClient<string>(httpRequest, config.interest_url);
    }
    return this.interestService;
  }

  getSkillService(): QueryService<string> {
    
    if (!this.skillService) {
      this.skillService = new QueryClient<string>(httpRequest, config.skill_url);
    }
    return this.skillService;
  }

}

export const context = new ApplicationContext();
// export function useGetMyProfileService(): MyProfileService {
//   const [service] = useState(() => { return context.getMyProfileService() })
//   return service;
// }

export function useLookingForService(): QueryService<string> {
  return context.getLookingForService();
}

export function useInterestService(): QueryService<string> {
  return context.getInterestService();
}

export function useSkillService(): QueryService<string> {
  return context.getSkillService();
}
