import React, {memo} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {Portal} from 'react-native-paper';

import {Text, Modal} from '@/ui';

import {Spacing} from '@/utils/constants';
import {states} from '@/utils/addressConstants';

import {IStateModal} from './StateModal.types';
import {styles} from './StateList.styles';

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
