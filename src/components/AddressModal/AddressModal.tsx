import {Button, Modal, Text} from '@/ui';
import React, {memo, useEffect, useMemo} from 'react';
import {Portal} from 'react-native-paper';
import Address from '../Address/Address';
import {View} from 'react-native';
import {styles} from './AddressModal.style';
import {Spacing} from '@/utils/constants';
import {useDispatch, useSelector} from 'react-redux';
import {updateAddress} from '@/services/reducers/profile.slice';
import {validateAddressForm} from '@/utils/addressConstants';
import {Colors} from '@/utils/colors';

interface IAddressModal {
  visible: boolean;
  onClose: () => void;
}

const AddressModal = ({visible, onClose}: IAddressModal) => {
  const {profile} = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    try {
      dispatch(
        updateAddress({
          ...profile.address_detail,
        }),
      );
      onClose();
      console.log(profile.address_detail);
    } catch (error) {}
  };

  const message = useMemo(
    () =>
      validateAddressForm(
        profile.address_detail.city,
        profile.address_detail.state,
        profile.address_detail.street,
        profile.address_detail.postal_code,
      ).message,
    [profile.address_detail],
  );

  const disabled = useMemo(
    () =>
      validateAddressForm(
        profile.address_detail.city,
        profile.address_detail.state,
        profile.address_detail.street,
        profile.address_detail.postal_code,
      ).valid,
    [profile.address_detail],
  );

  return (
    <Portal>
      <Modal
        onDismiss={onClose}
        style={{padding: Spacing.xl}}
        visible={visible}>
        <View style={styles.card}>
          <Address />
          {disabled ? (
            <Text style={{color: Colors.danger}}>{message}</Text>
          ) : (
            <></>
          )}
          <Button
            disabled={!disabled}
            onPress={handleUpdate}
            style={[
              styles.updateButton,
              {backgroundColor: !disabled ? Colors.grey : Colors.success},
            ]}>
            <Text style={styles.updateText}>Update</Text>
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default memo(AddressModal);
