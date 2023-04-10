export interface ICityModal {
  visible: boolean;
  closeModal: () => void;
  onSelect: () => string;
  state: string;
}
