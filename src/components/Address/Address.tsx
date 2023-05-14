import React, {memo, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

import TextInput from '@/ui/TextInput';
import {styles} from './Address.styles';
import StateModal from '../StatesModal/StateModal';
import CityModal from '../CityModal/CityModal';
import {AddressState} from './Address.types';

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
        onChangeText={val => handleFormUpdate('street', val)}
        placeholder="Address"
      />
      <View style={styles.stateContainer}>
        <TouchableOpacity onPress={() => handleOpenModal('stateModal', true)}>
          <TextInput
            style={styles.stateButton}
            value={form?.address_detail?.state}
            onFocus={() => handleOpenModal('stateModal', true)}
            placeholder="Select a state"
            editable={false}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOpenModal('citiesModal', true)}>
          <TextInput
            style={styles.stateButton}
            value={form?.address_detail?.city}
            onFocus={() => handleOpenModal('citiesModal', true)}
            placeholder="Select a city"
            editable={false}
          />
        </TouchableOpacity>
      </View>

      <TextInput
        mode="outlined"
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
