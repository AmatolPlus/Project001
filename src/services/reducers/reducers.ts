import {contestReducerPath, contestService} from '@/services/apis/contests.api';
import {loginReducerPath, loginService} from '@/services/apis/login.api';
import {walletReducerPath, walletService} from '../apis/wallet.api';
import profileSlice from './profile.slice';

export const reducer = {
  [loginReducerPath]: loginService.reducer,
  [contestReducerPath]: contestService.reducer,
  [walletReducerPath]: walletService.reducer,
  profile: profileSlice,
};
