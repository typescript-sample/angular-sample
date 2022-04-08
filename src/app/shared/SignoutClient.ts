import {HttpClient} from '@angular/common/http';
import {storage} from 'uione';
import config from '../../config';

export interface SignoutService {
  signout(username: string): Promise<boolean>;
}
export class SignoutClient implements SignoutService {
  constructor(private http: HttpClient) {
  }

  async signout(username: string): Promise<boolean> {
    const url = config.authentication_url + '/authentication/signout/' + username;
    const success = await this.http.get<boolean>(url).toPromise();
    if (success) {
      sessionStorage.setItem('authService', null);
      sessionStorage.clear();
      storage.setUser(null);
    }
    return success;
  }
}
