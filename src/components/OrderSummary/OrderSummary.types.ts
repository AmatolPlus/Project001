interface IOrderSummary {
  onConfirm: () => void;
  onClose: () => void;
  imageUrl: string;
  contestName: string;
  entryFee: string | number;
  wallet_amount: string | number;
}
