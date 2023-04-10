import {states} from '@/utils/addressConstants';
import React, {memo} from 'react';
import {View} from 'react-native';
import Modal from '../../ui/Modal';
import {TouchableOpacity} from 'react-native';
import Text from '../../ui/Text';
import {Spacing} from '@/utils/constants';
import {Portal} from 'react-native-paper';
import {styles} from './StateList.styles';
import {ScrollView} from 'react-native';
import {IStateModal} from './StateModal.types';

const StatesModal = ({visible, closeModal, onSelect}: IStateModal) => {
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
            {states.map((state, index) => (
              <TouchableOpacity
                key={index}
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

export default memo(StatesModal);
