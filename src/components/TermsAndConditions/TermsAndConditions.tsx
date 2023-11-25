import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {View, TouchableOpacity} from 'react-native';
import {Portal} from 'react-native-paper';

import {Modal, Text} from '@/ui';

import {styles} from './TermsAndConditions.styles';
import {fontSize} from '@/utils/fonts';
import {Colors} from '@/utils/colors';
import {ScrollView} from 'react-native';

const TermsAndConditionsModal = ({message}: any) => {
  const [visible, setVisible] = useState(false);

  const toggleModal = () => {
    setVisible(!visible);
  };

  return (
    <>
      <TouchableOpacity onPress={toggleModal}>
        <Text style={styles.link}>Terms and Conditions</Text>
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
            <ScrollView>
              <Text style={styles.message}>{message}</Text>
            </ScrollView>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

export default TermsAndConditionsModal;
