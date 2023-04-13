import React from 'react';
import {StyleSheet, View} from 'react-native';
import Button from './Button';
import Modal from './Modal';
import Text from './Text';
import {Colors} from '@/utils/colors';
import {Portal} from 'react-native-paper';
import {Spacing} from '@/utils/constants';
import {height} from '@/utils/Dimension';

height;
interface IJoinEventModal {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const JoinEventConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
}: IJoinEventModal) => {
  return (
    <Portal>
      <Modal visible={isOpen}>
        <View style={styles.container}>
          <View>
            <Text>YET to develop</Text>
            <Text>100 </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button buttonColor={Colors.success} onPress={onConfirm}>
              <Text>Confirm</Text>
            </Button>
            <Button buttonColor={Colors.danger} onPress={onClose}>
              <Text>Cancel</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    height: height / 1.6,
    marginHorizontal: Spacing.l,
    justifyContent: 'space-between',
    padding: Spacing.xl,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
  },
});

export default JoinEventConfirmModal;
