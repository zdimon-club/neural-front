import { environment } from './environment';

const prefix = 'v1';

export const apiUrls = {
  login_post_form: `${environment.apiUrl}/${prefix}/account/login`,
  login_google: `${environment.apiUrl}/${prefix}/authsocial/google`,
  logout_get: `${environment.apiUrl}/${prefix}/account/logout`,
  init_get: `${environment.apiUrl}/${prefix}/account/init`,
  userlist_get: `${environment.apiUrl}/${prefix}/userlist/get`
}

