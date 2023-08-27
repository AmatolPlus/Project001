import React, {memo, useState} from 'react';
import {ToastAndroid, TouchableOpacity, View} from 'react-native';

import CityModal from '../CityModal/CityModal';
import TextInput from '@/ui/TextInput';
import StateModal from '../StatesModal/StateModal';

import {styles} from './Address.styles';
import {AddressState} from './Address.types';
import {Colors} from '@/utils/colors';

const Address = ({form, onChange}: any) => {
  let [modals, setModals] = useState({
    stateModal: false,
    citiesModal: false,
  });

  const handleFormUpdate = (key: keyof AddressState, value: string) => {
    onChange(key, value);
  };

  const handleOpenModal = (key: string, value: boolean) => {
    setModals({
      ...modals,
      [key]: value,
    });
  };

  const handleCloseModal = (key: string, value: boolean) => {
    setModals({
      ...modals,
      [key]: value,
    });
  };

  return (
    <View>
      <TextInput
        value={form?.address_detail?.street}
        style={styles.input}
        outlineColor={Colors.info}
        activeOutlineColor={Colors.info}
        onChangeText={val => handleFormUpdate('street', val)}
        placeholder="Address"
      />
      <View style={styles.stateContainer}>
        <TouchableOpacity onPress={() => handleOpenModal('stateModal', true)}>
          <TextInput
            style={styles.stateButton}
            outlineColor={Colors.info}
            activeOutlineColor={Colors.info}
            value={form?.address_detail?.state}
            onFocus={() => handleOpenModal('stateModal', true)}
            placeholder="Select a state"
            editable={false}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (form?.address_detail?.state) {
              handleOpenModal('citiesModal', true);
            } else {
              ToastAndroid.show('Select the State', ToastAndroid.SHORT);
            }
          }}>
          <TextInput
            style={{
              ...styles.stateButton,
              backgroundColor: !form?.address_detail?.state
                ? Colors.light
                : Colors.white,
            }}
            value={form?.address_detail?.city}
            onFocus={() => handleOpenModal('citiesModal', true)}
            placeholder="Select a city"
            editable={false}
          />
        </TouchableOpacity>
      </View>

      <TextInput
        mode="outlined"
        outlineColor={Colors.info}
        activeOutlineColor={Colors.info}
        maxLength={6}
        keyboardType="number-pad"
        value={form?.address_detail?.postal_code}
        style={styles.input}
        onChangeText={val => handleFormUpdate('postal_code', val)}
        placeholder="Postal Code"
      />
      <StateModal
        visible={modals.stateModal}
        closeModal={async () => handleCloseModal('stateModal', false)}
        onSelect={(state: any) => handleFormUpdate('state', state)}
      />
      <CityModal
        state={form?.address_detail?.state}
        visible={modals.citiesModal}
        closeModal={async () => handleCloseModal('citiesModal', false)}
        onSelect={(city: any) => handleFormUpdate('city', city)}
      />
    </View>
  );
};

export default memo(Address);
