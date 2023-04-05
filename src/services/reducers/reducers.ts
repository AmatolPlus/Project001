import {contestReducerPath, contestService} from '@/services/apis/contests.api';
import {loginReducerPath, loginService} from '@/services/apis/login.api';
import {profileReducerPath, profileService} from '../apis/profile.api';
import {walletReducerPath, walletService} from '../apis/wallet.api';

export const reducer = {
  [loginReducerPath]: loginService.reducer,
  [contestReducerPath]: contestService.reducer,
  [profileReducerPath]: profileService.reducer,
  [walletReducerPath]: walletService.reducer,
};
