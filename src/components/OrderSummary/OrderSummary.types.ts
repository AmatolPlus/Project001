interface IOrderSummary {
  onConfirm: () => void;
  onClose: () => void;
  contestName: string;
  entryFee: string | number;
  wallet_amount: string | number;
}
