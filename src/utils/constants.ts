export enum HTTP_TYPES {
  'GET' = 'get',
  'POST' = 'post',
  'PUT' = 'put',
  'DELETE' = 'delete',
  'PATCH' = 'patch',
}

export const BASE_API = '';

export const ACCESS_TOKEN = 'ACCESS_TOKEN';

export const API_ROUTES = {
  USER: {
    LOGIN: 'auth/login',
    SIGN_UP: 'auth/sign-up',
    WHO_AM_I: 'auth/who-am-i',
  },
};

export const ROUTES = {
  LOGIN: 'login',
  DASHBOARD: 'dashboard',
};
