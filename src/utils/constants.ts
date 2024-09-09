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
    SIGN_UP: 'auth/signUp',
    WHO_AM_I: 'auth/whoAmI',
  },
  EXPENSES: {
    CREATE: 'expenses',
    ALL: 'expenses',
    DELETE: 'expenses/[id]',
    GROUPED_SUM_BY_TYPE:
      'expenses/getGroupedExpensesByType?startDate=[startDate]&endDate=[endDate]',
  },
  TYPES: {
    ALL: 'types',
  },
};

export const ROUTES = {
  LOGIN: '/login',
  SIGN_UP: '/signup',
  DASHBOARD: '/dashboard',
  ALL_EXPENSES: '/dashboard/all',
  ADD_EXPENSES: '/dashboard/add-expense',
};
