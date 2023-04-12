import React, {useCallback, useState} from 'react';
import {View} from 'react-native';

import {Modal, Text} from '@/ui';
import {styles} from './ParticipantsList.styles';
import {Portal} from 'react-native-paper';

const ParticipantsList = ({participants}: any) => {
  const [visible, setVisible] = useState(false);

  const handleModal = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  return (
    <View>
      <Text onPress={handleModal} style={styles.participantText}>
        Participants ({participants})
      </Text>
      <Portal>
        <Modal
          onDismiss={handleModal}
          style={styles.modalContainer}
          visible={visible}>
          <View style={styles.modal}>
            <Text style={styles.header}>{'Participants List'}</Text>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default ParticipantsList;
