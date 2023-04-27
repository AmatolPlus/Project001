import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';

import {styles} from './TermsAndConditions.styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Modal, Text} from '@/ui';
import {fontSize} from '@/utils/fonts';
import {Colors} from '@/utils/colors';
import {Portal} from 'react-native-paper';

const TermsAndConditionsModal = ({message}: any) => {
  const [visible, setVisible] = useState(false);

  const toggleModal = () => {
    setVisible(!visible);
  };

  return (
    <>
      <TouchableOpacity onPress={toggleModal}>
        <Text style={styles.link}>View Terms and Conditions</Text>
      </TouchableOpacity>
      <Portal>
        <Modal visible={visible} style={styles.modal} onDismiss={toggleModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.heading}>Terms and Conditions</Text>
              <TouchableOpacity onPress={toggleModal}>
                <AntDesign
                  name="close"
                  size={fontSize.h2}
                  color={Colors.dark}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.message}>{message}</Text>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

export default TermsAndConditionsModal;
