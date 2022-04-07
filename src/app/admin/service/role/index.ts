import { Injectable } from '@angular/core';
import { HttpRequest } from '@/app/shared/HttpRequest';
import { GenericSearchClient } from 'web-clients';
import { Privilege, Role, roleModel, RoleService } from './role';
import config from '@/config';
import { ResultInfo, RoleFilter } from 'onecore';

export * from './role';

@Injectable()
export class RoleClient extends GenericSearchClient<Role, any, ResultInfo<Role>, RoleFilter> implements RoleService {
    constructor(http: HttpRequest) {
      super(http, config.role_url, roleModel);
      this.searchGet = true;
    }
    getPrivileges(ctx?: any): Promise<Privilege[]> {
      return this.http.get<Privilege[]>(config.privilege_url);
    }
    assign(roleId: string, users: string[]): Promise<number> {
      return this.http.put<number>(`${config.role_url}/${roleId}/assign`, users);
    }
    getRoles(): Promise<Role[]> {
      return this.http.get<Role[]>(config.role_url);
    }
  
  }
