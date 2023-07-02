import {Modal} from '@/ui';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {Portal} from 'react-native-paper';
import {ToastAndroid, View} from 'react-native';
import {Spacing} from '@/utils/constants';
import {styles} from './UserDetailsModal.styles';
import UserDetails from '../UserDetail/UserDetails';
import {
  useUpdateUserDetailsMutation,
  useUserDetailsQuery,
} from '@/services/apis/login.api';
import {FormData, IUserDetailsModal} from './UserDetailModal.types';

const UserDetailsModal = ({visible, onClose}: IUserDetailsModal) => {
  const [form, setForm] = useState<FormData>({
    first_name: '',
    last_name: '',
    email: '',
    hobby: '',
    birthday: '',
    gender: '',
  });
  const [update, {error}]: any = useUpdateUserDetailsMutation();
  const {data: user, refetch} = useUserDetailsQuery({});

  const handleSubmit = useCallback(() => {
    try {
      update(form);
      refetch();
      if (error) {
        console.log(error);
      } else {
        ToastAndroid.show(
          'User Details Updated SuccessFully',
          ToastAndroid.LONG,
        );
      }
      onClose();
    } catch (e) {}
  }, [form, onClose, refetch, error, update]);

  const handleChange = (key: keyof FormData, value: string) => {
    setForm(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  useEffect(() => {
    setForm(user);
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
