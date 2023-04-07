import React from 'react';
import {Dimensions, View} from 'react-native';
import Button from './Button';
import Modal from './Modal';
import Text from './Text';
import {Colors} from '@/utils/colors';
import {Portal} from 'react-native-paper';
import {Spacing} from '@/utils/constants';

const {height} = Dimensions.get('window');
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
        <View
          style={{
            backgroundColor: Colors.white,
            height: height / 1.6,
            marginHorizontal: Spacing.l,
            justifyContent: 'space-between',
            padding: Spacing.xl,
          }}>
          <View>
            <Text>YET to develop</Text>
            <Text>100 </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 15,
            }}>
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

export default JoinEventConfirmModal;
