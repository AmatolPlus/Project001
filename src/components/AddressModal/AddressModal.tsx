import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {Portal} from 'react-native-paper';
import {ToastAndroid, View} from 'react-native';

import Address from '../Address/Address';

import {
  useUpdateUserDetailsMutation,
  useUserDetailsQuery,
} from '@/services/apis/login.api';

import {Button, Modal, Text} from '@/ui';
import {styles} from './AddressModal.style';
import {Spacing} from '@/utils/constants';
import {validateAddressForm} from '@/utils/addressConstants';
import {Colors} from '@/utils/colors';

const AddressModal = ({visible, onClose, refetch}: any) => {
  const [form, setForm] = useState<any>({});
  const [update]: any = useUpdateUserDetailsMutation({});
  const {data: user} = useUserDetailsQuery({});

  const handleUpdate = (key: string, value: string) => {
    try {
      setForm({
        ...form,
        address_detail: {
          ...form?.address_detail,
          [key]: value,
        },
      });
    } catch (e) {}
  };

  const handleSubmit = useCallback(() => {
    update(form);
    refetch();
    ToastAndroid.show('Address Updated SuccessFully', ToastAndroid.LONG);
    onClose();
  }, [form, refetch, onClose, update]);

  const message = useMemo(
    () =>
      validateAddressForm(
        form?.address_detail?.city,
        form?.address_detail?.state,
        form?.address_detail?.street,
        form?.address_detail?.postal_code,
      )?.message,
    [form?.address_detail],
  );

  const disabled = useMemo(
    () =>
      validateAddressForm(
        form?.address_detail?.city,
        form?.address_detail?.state,
        form?.address_detail?.street,
        form?.address_detail?.postal_code,
      )?.valid,
    [form?.address_detail],
  );

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
          <Address form={form} onChange={handleUpdate} />
          {disabled ? (
            <Text style={{color: Colors.danger}}>{message}</Text>
          ) : (
            <></>
          )}
          <Button
            disabled={!disabled}
            onPress={handleSubmit}
            style={{
              ...styles.updateButton,
              backgroundColor: !disabled ? Colors.grey : Colors.danger,
            }}>
            <Text style={styles.updateText}>Update</Text>
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default memo(AddressModal);
