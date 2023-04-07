import {Button, Modal, Text} from '@/ui';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {Portal} from 'react-native-paper';
import {View} from 'react-native';
import {Spacing} from '@/utils/constants';
import Social from '../Social/Social';
import {styles} from './SocialMediaModal.styles';
import {
  useUpdateUserDetailsMutation,
  useUserDetailsQuery,
} from '@/services/apis/login.api';

interface ISocialMediaModal {
  visible: boolean;
  onClose: () => void;
}

const SocialMediaModal = ({visible, onClose}: ISocialMediaModal) => {
  const [form, setForm] = useState<any>({});
  const [update]: any = useUpdateUserDetailsMutation({});
  const {data: user} = useUserDetailsQuery({});

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
  }, [form, update]);

  return (
    <Portal>
      <Modal
        onDismiss={onClose}
        style={{padding: Spacing.xl}}
        visible={visible}>
        <View style={styles.card}>
          <Social form={form} onChange={handleUpdate} />
          <Button onPress={handleSubmit} style={styles.updateButton}>
            <Text style={styles.updateText}>Update</Text>
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default memo(SocialMediaModal);
