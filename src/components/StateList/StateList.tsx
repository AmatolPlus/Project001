import {states} from '@/utils/addressConstants';
import React, {useState} from 'react';
import {View} from 'react-native';
import TextInput from '../../ui/TextInput';
import Modal from '../../ui/Modal';
import {TouchableOpacity} from 'react-native';
import Text from '../../ui/Text';
import {Spacing} from '@/utils/constants';
import {Portal} from 'react-native-paper';
import {styles} from './StateList.styles';

const StatesModal = ({visible, closeModal, onSelect}: any) => {
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
          {states.map((state, index) => (
            <TouchableOpacity
              key={index}
              style={styles.stateButton}
              onPress={() => handleSelectState(state)}>
              <Text>{state}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </Portal>
  );
};

const StateList = ({onChangeText}: any) => {
  const [selectedState, setSelectedState] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (stateName: React.SetStateAction<string>) => {
    setSelectedState(stateName);
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
          style={styles.input}
          value={selectedState}
          onFocus={handleOpenModal}
          placeholder="Select a state"
          editable={false}
        />
      </TouchableOpacity>
      <StatesModal
        visible={modalVisible}
        closeModal={handleCloseModal}
        onSelect={handleSelect}
      />
    </View>
  );
};

export default StateList;
