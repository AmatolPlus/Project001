export interface IOrderSummary {
  onConfirm: any;
  onClose: () => void;
  imageId: string;
  image: string;
  handleImageUploaded: () => void;
  contestName: string;
  entryFee: string | number;
  ends_on: string;
  started_on: string;
  mobile_number: string;
  wallet_amount: string | number;
}
