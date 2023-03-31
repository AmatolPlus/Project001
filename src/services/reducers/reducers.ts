import {contestReducerPath} from '../apis/contests.api';
import {loginReducerPath} from '../apis/login.api';
import contestsSlice from './contests.slice';
import loginSlice from './login.slice';

export const reducer = {
  [loginReducerPath]: loginSlice,
  [contestReducerPath]: contestsSlice,
};
