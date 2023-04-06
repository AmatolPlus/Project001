import React, {memo, useEffect} from 'react';
import TextInput from '@/ui/TextInput';
import {View} from 'react-native';
import {styles} from './Address.styles';
import {useDispatch, useSelector} from 'react-redux';
import {updateAddress} from '@/services/reducers/profile.slice';

interface AddressState {
  street: string | undefined;
  city: string | undefined;
  state: string | undefined;
  postal_code: string | undefined;
}

const Address = () => {
  const {profile}: any = useSelector(state => state);

  const dispatch = useDispatch();

  const handleFormUpdate = (key: keyof AddressState, value: string) => {
    dispatch(
      updateAddress({
        [key]: value,
      }),
    );
  };

  return (
    <View>
      <TextInput
        value={profile?.address_detail?.street}
        style={styles.input}
        onChangeText={val => handleFormUpdate('street', val)}
        placeholder="Street"
      />
      <TextInput
        value={profile?.address_detail?.city}
        style={styles.input}
        onChangeText={val => handleFormUpdate('city', val)}
        placeholder="City"
      />
      <TextInput
        value={profile?.address_detail?.state}
        style={styles.input}
        onChangeText={val => handleFormUpdate('state', val)}
        placeholder="State"
      />
      <TextInput
        value={profile?.address_detail?.postal_code}
        style={styles.input}
        onChangeText={val => handleFormUpdate('postal_code', val)}
        placeholder="Postal Code"
      />
    </View>
  );
};

export default memo(Address);
