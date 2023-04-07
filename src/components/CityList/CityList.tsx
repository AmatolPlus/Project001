import React, {useState} from 'react';
import {View} from 'react-native';
import TextInput from '../../ui/TextInput';
import Modal from '../../ui/Modal';
import {TouchableOpacity} from 'react-native';
import Text from '../../ui/Text';
import {Spacing} from '@/utils/constants';
import {Portal} from 'react-native-paper';
import {styles} from './CityList.styles';
import {getCitiesByState} from '@/utils/cities';
import {ScrollView} from 'react-native';

const CitiesModal = ({visible, closeModal, onSelect, state}: any) => {
  let cities = getCitiesByState(state);

  const handleSelectState = (stateName: string) => {
    onSelect(stateName);
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
            {cities.map((state: string) => (
              <TouchableOpacity
                key={state}
                style={styles.stateButton}
                onPress={() => handleSelectState(state)}>
                <Text>{state}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </Portal>
  );
};

const CitiesList = ({city, state, onChange}: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleSelect = (cityName: React.SetStateAction<string>) => {
    onChange(cityName);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleOpenModal}>
        <TextInput
          value={city}
          mode={'flat'}
          onFocus={handleOpenModal}
          style={styles.cityButton}
          placeholder="Select a city"
          editable={false}
        />
      </TouchableOpacity>
      <CitiesModal
        state={state}
        visible={modalVisible}
        closeModal={handleCloseModal}
        onSelect={handleSelect}
      />
    </View>
  );
};

export default CitiesList;
