import React, {memo} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {Portal} from 'react-native-paper';

import {Modal, Text} from '@/ui';

import {Spacing} from '@/utils/constants';
import {getCitiesByState} from '@/utils/cities';

import {ICityModal} from './CityModal.types';
import {styles} from './CityList.styles';

const CitiesModal = ({visible, closeModal, onSelect, state}: ICityModal) => {
  let cities = getCitiesByState(state);

  const handleSelectCity = (cityName: string) => {
    onSelect(cityName);
    closeModal();
  };

  return (
    <Portal>
      <Modal
        style={{padding: Spacing.xl}}
        visible={visible}
        onDismiss={closeModal}>
        <View style={styles.card}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {cities.map((city: string) => (
              <TouchableOpacity
                key={city}
                style={styles.stateButton}
                onPress={() => handleSelectCity(city)}>
                <Text>{city}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </Portal>
  );
};

export default memo(CitiesModal);
