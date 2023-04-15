export interface IWallet {
  wallet: any;
  onRefreshWallet: () => void;
  onWithdraw: () => void;
  loading: boolean;
}
