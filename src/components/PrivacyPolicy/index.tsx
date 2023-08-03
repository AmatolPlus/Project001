import {usePrivacyQuery} from '@/services/apis/login.api';
import {Button, Modal, Text} from '@/ui';
import {Spacing} from '@/utils/constants';
import React, {useState} from 'react';
import {Dimensions, Pressable, ScrollView, View} from 'react-native';
import {styles} from '../SocialMediaModal/SocialMediaModal.styles';
import {Fonts} from '@/utils/fonts';
import {Colors} from '@/utils/colors';

const PrivacyPolicy = () => {
  const [isOpen, setOpen] = useState(false);
  const {data} = usePrivacyQuery();
  const {title, description} = data || {};
  const handleToggleModal = () => {
    setOpen(!isOpen);
  };
  return (
    <>
      <Pressable onPress={handleToggleModal}>
        <Text style={styles.link}>Privacy Policy</Text>
      </Pressable>
      <Modal
        onDismiss={handleToggleModal}
        style={{padding: Spacing.s}}
        visible={isOpen}>
        <ScrollView
          style={{
            backgroundColor: 'white',
            height: '100%',
            width: '100%',
          }}>
          <Text style={{...Fonts.h3}}>{title}</Text>
          <Text style={{...Fonts.h5}}>{description}</Text>
          <Button
            onPress={handleToggleModal}
            buttonColor={Colors.success}
            style={{margin: Spacing.m}}>
            <Text
              style={{
                color: Colors.white,
              }}>
              Close
            </Text>
          </Button>
        </ScrollView>
      </Modal>
    </>
  );
};

export default PrivacyPolicy;
