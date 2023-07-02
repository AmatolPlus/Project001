import {View} from 'react-native';
import React from 'react';
import {Portal} from 'react-native-paper';
import {Button, Modal, Text} from '@/ui';
import {styles} from './ConfirmLikeModal.styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fontSize} from '@/utils/fonts';
import {Colors} from '@/utils/colors';

interface IConfirmLike {
  visible: boolean;
  onClose: () => void;
  onConfirmLike: () => void;
}

export default function ConfirmLikeModal({
  visible,
  onClose,
  onConfirmLike,
}: IConfirmLike) {
  return (
    <Portal>
      <Modal style={styles.modal} visible={visible} onDismiss={onClose}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>You Cannot Dislike Once you Like</Text>
            <AntDesign
              onPress={onClose}
              name="close"
              size={fontSize.h3}
              color={Colors.dark}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={onConfirmLike} style={styles.button}>
              <Text style={styles.buttonText}>Go Ahead</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
