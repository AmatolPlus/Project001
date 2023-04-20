import React, {useCallback, useState} from 'react';
import {Portal} from 'react-native-paper';

import Modal from './Modal';
import OrderSummary from '@/components/OrderSummary/OrderSummary';
import Text from './Text';
import {StyleSheet, View} from 'react-native';
import {Spacing} from '@/utils/constants';
import {Colors} from '@/utils/colors';
import Button from './Button';
import Image from './Image';
import {Fonts} from '@/utils/fonts';
import {useUploadImageMutation} from '@/services/apis/contests.api';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
interface IJoinEventModal {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  entryFee: number | string;
  contestName: string;
  wallet: string | number;
}

const JoinEventConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  entryFee,
  contestName,
  wallet,
}: IJoinEventModal) => {
  const [image, setImage] = useState<any>();
  const [imageUrl, setImageUrl] = useState();
  const [upload, {isLoading}] = useUploadImageMutation();
  const [hasImageUploaded, setImageUploaded] = useState(false);

  const pickImageCamera = useCallback(() => {
    launchCamera({
      mediaType: 'photo',
      quality: 0.8,
    }).then((result: any) => {
      setImage(result.assets[0]);
    });
  }, []);

  const pickImageFromLibrary = useCallback(async () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    }).then((result: any) => {
      setImage(result?.assets[0]);
    });
  }, []);

  const uploadImage = useCallback(async () => {
    try {
      let data: any = await upload({
        file: image,
      });
      if (data?.data?.details === 'Success') {
        setImageUrl(data?.data?.url);
        setImageUploaded(!hasImageUploaded);
      }
    } catch (e) {}
  }, [hasImageUploaded, image, upload]);

  return (
    <Portal>
      <Modal style={styles.modal} onDismiss={onClose} visible={isOpen}>
        {!hasImageUploaded ? (
          <View style={styles.container}>
            <Text style={styles.title}>Upload An Image</Text>
            <View style={!image ? styles.imageContainer : null}>
              {image ? (
                <Image source={{uri: image?.uri}} style={styles.image} />
              ) : (
                <Text>Choose an Image from Camera or Files</Text>
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                textColor={Colors.white}
                style={styles.button}
                onPress={pickImageFromLibrary}>
                Choose from Library
              </Button>
              <Button
                style={styles.button}
                textColor={Colors.white}
                onPress={pickImageCamera}>
                Take a Photo
              </Button>
            </View>
            <Button
              loading={isLoading}
              onPress={uploadImage}
              disabled={image || !isLoading ? false : true}
              textColor={Colors.white}
              style={{
                ...styles.confirmUpload,
                backgroundColor: image ? Colors.success : Colors.grey,
              }}>
              Upload
            </Button>
          </View>
        ) : (
          <OrderSummary
            imageUrl={`${imageUrl}`}
            onConfirm={onConfirm}
            onClose={onClose}
            contestName={contestName}
            entryFee={entryFee}
            wallet_amount={wallet}
          />
        )}
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    padding: Spacing.l,
  },
  container: {
    width: '100%',
    padding: Spacing.l,
    borderRadius: Spacing.m,
    backgroundColor: Colors.white,
  },
  title: {
    ...Fonts.h2,
  },
  imageContainer: {
    height: 300,

    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xl,
    backgroundColor: Colors.grey,
  },
  image: {
    marginTop: Spacing.xl,
    height: 300,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: Spacing.m,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: Colors.success,
  },
  confirmUpload: {
    backgroundColor: Colors.success,
    padding: Spacing.s,
    marginTop: Spacing.m,
  },
});

export default JoinEventConfirmModal;
