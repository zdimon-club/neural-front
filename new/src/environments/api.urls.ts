import { environment } from './environment';

const prefix = 'v1';

export const apiUrls = {
  login_post_form: `${environment.apiUrl}/${prefix}/account/login`,
  login_google: `${environment.apiUrl}/${prefix}/authsocial/google`,
  logout_post: `${environment.apiUrl}/${prefix}/account/logout`,
  init_get: `${environment.apiUrl}/${prefix}/account/init`,
  userlist_get: `${environment.apiUrl}/${prefix}/userlist/get`,
  userlist_online: `${environment.apiUrl}/${prefix}/userlist/online`,
  i18n: `${environment.apiUrl}/${prefix}/i18n/`,
  props_list: `${environment.apiUrl}/${prefix}/props/list/`,
  props_save: `${environment.apiUrl}/${prefix}/props/save/`,
  email_check: `${environment.apiUrl}/${prefix}/account/check/email`,
  register_man: `${environment.apiUrl}/${prefix}/account/register/man`,
  register_woman: `${environment.apiUrl}/${prefix}/account/register/woman`,
  register_agency: `${environment.apiUrl}/${prefix}/account/register/agency`,
  new_password: `${environment.apiUrl}/${prefix}/account/new/password`,
}

