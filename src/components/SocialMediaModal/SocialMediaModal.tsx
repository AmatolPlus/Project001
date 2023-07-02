import {Button, Modal, Text} from '@/ui';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {Portal} from 'react-native-paper';
import {Pressable, ToastAndroid, View} from 'react-native';
import {Spacing} from '@/utils/constants';
import Social from '../Social/Social';
import {styles} from './SocialMediaModal.styles';
import {
  useUpdateUserDetailsMutation,
  useUserDetailsQuery,
} from '@/services/apis/login.api';

const SocialMediaModal = () => {
  const [form, setForm] = useState<any>({});
  const [update]: any = useUpdateUserDetailsMutation({});
  const {data: user} = useUserDetailsQuery({});
  const [socialMediaModal, setSocialMediaModal] = useState(false);

  const handleSocialChange = useCallback(() => {
    setSocialMediaModal(!socialMediaModal);
  }, [socialMediaModal]);

  useEffect(() => {
    setForm(user);
  }, [user]);

  const handleUpdate = (key: string, value: string) => {
    setForm({
      ...form,
      [key]: {
        ...form[key],
        link: value,
      },
    });
  };

  const handleSubmit = useCallback(() => {
    update(form);
    ToastAndroid.show('Links Updated SuccessFully', ToastAndroid.LONG);
    handleSocialChange();
  }, [form, handleSocialChange, update]);

  return (
    <View>
      <Pressable onPress={handleSocialChange}>
        <Text style={styles.link}>Add / Change Social Media link</Text>
      </Pressable>
      <Portal>
        <Modal
          onDismiss={handleSocialChange}
          style={{padding: Spacing.xl}}
          visible={socialMediaModal}>
          <View style={styles.card}>
            <Social form={form} onChange={handleUpdate} />
            <Button onPress={handleSubmit} style={styles.updateButton}>
              <Text style={styles.updateText}>Update</Text>
            </Button>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default memo(SocialMediaModal);
