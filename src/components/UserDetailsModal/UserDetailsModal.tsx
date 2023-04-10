import {Modal} from '@/ui';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {Portal} from 'react-native-paper';
import {View} from 'react-native';
import {Spacing} from '@/utils/constants';
import {styles} from './UserDetailsModal.styles';
import UserDetails from '../UserDetail/UserDetails';
import {
  useUpdateUserDetailsMutation,
  useUserDetailsQuery,
} from '@/services/apis/login.api';

interface IUserDetailsModal {
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
}

const UserDetailsModal = ({visible, onClose}: IUserDetailsModal) => {
  const [form, setForm] = useState<FormData>({
    first_name: '',
    last_name: '',
    email: '',
    hobby: '',
    birthday: '',
    gender: '',
  });
  const [update]: any = useUpdateUserDetailsMutation({});
  const {data: user, refetch} = useUserDetailsQuery({});

  const handleSubmit = useCallback(() => {
    try {
      update(form);
      refetch();
      onClose();
    } catch (error) {}
  }, [form, onClose, refetch, update]);

  const handleChange = (attribute: keyof FormData, value: string) => {
    setForm(prevState => ({
      ...prevState,
      [attribute]: value,
    }));
  };

  useEffect(() => {
    setForm(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Portal>
      <Modal
        onDismiss={onClose}
        style={{padding: Spacing.xl}}
        visible={visible}>
        <View style={styles.card}>
          <UserDetails
            form={form}
            onChange={(key, value) => handleChange(key, value)}
            onSubmit={handleSubmit}
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default memo(UserDetailsModal);
