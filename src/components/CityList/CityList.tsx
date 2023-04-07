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
import {useDispatch, useSelector} from 'react-redux';
import {updateAddress} from '@/services/reducers/profile.slice';
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

const CitiesList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const {profile} = useSelector(state => state.profile);

  const handleSelect = (cityName: React.SetStateAction<string>) => {
    dispatch(
      updateAddress({
        city: cityName,
      }),
    );
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
          value={profile.address_detail.city}
          mode={'flat'}
          onFocus={handleOpenModal}
          style={styles.cityButton}
          placeholder="Select a city"
          editable={false}
        />
      </TouchableOpacity>
      <CitiesModal
        state={profile?.address_detail.state}
        visible={modalVisible}
        closeModal={handleCloseModal}
        onSelect={handleSelect}
      />
    </View>
  );
};

export default CitiesList;
