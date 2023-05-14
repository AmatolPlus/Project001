import {Button, Modal, Text} from '@/ui';
import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {Portal} from 'react-native-paper';
import Address from '../Address/Address';
import {ToastAndroid, View} from 'react-native';
import {styles} from './AddressModal.style';
import {Spacing} from '@/utils/constants';
import {validateAddressForm} from '@/utils/addressConstants';
import {Colors} from '@/utils/colors';
import {
  useUpdateUserDetailsMutation,
  useUserDetailsQuery,
} from '@/services/apis/login.api';
import {Pressable} from 'react-native';

const AddressModal = () => {
  const [form, setForm] = useState<any>({});
  const [addressModal, setShowAddressModal] = useState(false);
  const [update]: any = useUpdateUserDetailsMutation({});
  const {data: user} = useUserDetailsQuery({});

  const handleToggleAddressModal = useCallback(() => {
    setShowAddressModal(!addressModal);
  }, [addressModal]);

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
    ToastAndroid.show('Address Updated SuccessFully', ToastAndroid.LONG);
    handleToggleAddressModal();
  }, [form, handleToggleAddressModal, update]);

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
    <View>
      <Pressable onPress={handleToggleAddressModal}>
        <Text style={styles.link}>Change Address</Text>
      </Pressable>
      <Portal>
        <Modal
          onDismiss={handleToggleAddressModal}
          style={{padding: Spacing.xl}}
          visible={addressModal}>
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
                backgroundColor: !disabled ? Colors.grey : Colors.success,
              }}>
              <Text style={styles.updateText}>Update</Text>
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default memo(AddressModal);
