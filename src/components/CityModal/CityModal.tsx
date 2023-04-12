import React, {memo} from 'react';
import {View} from 'react-native';
import Modal from '../../ui/Modal';
import {TouchableOpacity} from 'react-native';
import Text from '../../ui/Text';
import {Spacing} from '@/utils/constants';
import {Portal} from 'react-native-paper';
import {styles} from './CityList.styles';
import {getCitiesByState} from '@/utils/cities';
import {ScrollView} from 'react-native';
import {ICityModal} from './CityModal.types';

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
