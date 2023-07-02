export interface IUserDetailsModal {
  visible: boolean;
  onClose: () => void;
}

export interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  hobby: string;
  birthday: string;
  gender: string;
  profile_id: string;
}
