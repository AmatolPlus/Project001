export interface IOrderSummary {
  onConfirm: any;
  onClose: () => void;
  cancel: any;
  imageId: string;
  image: string;
  handleImageUploaded: () => void;
  contestName: string;
  entryFee: string | number;
  ends_on: string;
  started_on: string;
  mobile_number: any;
  wallet_amount: string | number;
}
