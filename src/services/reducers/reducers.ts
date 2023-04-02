import {contestReducerPath, contestService} from '@/services/apis/contests.api';
import {loginReducerPath, loginService} from '@/services/apis/login.api';

export const reducer = {
  [loginReducerPath]: loginService.reducer,
  [contestReducerPath]: contestService.reducer,
};
