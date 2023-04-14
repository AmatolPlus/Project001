export interface IChangePassword {
  type: ChangePasswordType;
  isOpen?: boolean;
  navigation?: any;
}

export type ChangePasswordType = 'modal' | 'component';
