import React, {memo, useEffect} from 'react';
import TextInput from '@/ui/TextInput';
import {View} from 'react-native';
import {styles} from './Address.styles';
import {useDispatch, useSelector} from 'react-redux';
import {updateAddress} from '@/services/reducers/profile.slice';
import StateList from '../StateList/StateList';
import CitiesList from '../CityList/CityList';

interface AddressState {
  street: string | undefined;
  city: string | undefined;
  state: string | undefined;
  postal_code: string | undefined;
}

const Address = ({form, onChange}: any) => {
  const handleFormUpdate = (key: keyof AddressState, value: string) => {
    onChange(key, value);
  };

  return (
    <View>
      <TextInput
        value={form?.address_detail?.street}
        style={styles.input}
        onChangeText={val => handleFormUpdate('street', val)}
        placeholder="Address"
      />
      <View style={styles.stateContainer}>
        <CitiesList
          city={form?.address_detail?.city}
          state={form?.address_detail?.state}
          onChange={(city: string) => handleFormUpdate('city', city)}
        />
        <StateList
          state={form?.address_detail?.state}
          onChange={(state: string) => handleFormUpdate('state', state)}
        />
      </View>

      <TextInput
        mode={'flat'}
        maxLength={6}
        keyboardType="number-pad"
        value={form?.address_detail?.postal_code}
        style={styles.input}
        onChangeText={val => handleFormUpdate('postal_code', val)}
        placeholder="Postal Code"
      />
    </View>
  );
};

export default memo(Address);
