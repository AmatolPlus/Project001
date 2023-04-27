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
import TextInput from './TextInput';
interface IJoinEventModal {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: any;
  started_on: string;
  ends_on: string;
  entryFee: number | string;
  contestName: string;
  wallet: string | number;
  mobile_number: string | number;
}

const JoinEventConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  entryFee,
  contestName,
  wallet,
  mobile_number,
  started_on,
  ends_on,
}: IJoinEventModal) => {
  const [imageId, setImageId] = useState();
  const [image, setImage] = useState('');

  const [uploadPost, setPost]: any = useState({
    imageUrl: undefined,
    caption: undefined,
  });
  const [upload, {isLoading}] = useUploadImageMutation();
  const [hasImageUploaded, setImageUploaded] = useState(false);

  const handleImageUploaded = useCallback(() => {
    setImageUploaded(!hasImageUploaded);
  }, [hasImageUploaded]);

  const handleOnConfirm = useCallback(async () => {
    onConfirm(imageId);
  }, [imageId, onConfirm]);

  const handlePostChange = useCallback(
    (key: string, value: string): any => {
      setPost({
        ...uploadPost,
        [key]: value,
      });
    },
    [uploadPost],
  );

  const handleCaptionChange = useCallback(
    (val: string) => {
      handlePostChange('caption', val);
    },
    [handlePostChange],
  );

  const pickImageCamera = useCallback(() => {
    launchCamera({
      mediaType: 'photo',
      quality: 0.8,
    }).then((result: any) => {
      handlePostChange('imageUrl', result?.assets[0]);
    });
  }, [handlePostChange]);

  const pickImageFromLibrary = useCallback(async () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    }).then((result: any) => {
      handlePostChange('imageUrl', result?.assets[0]);
    });
  }, [handlePostChange]);

  const uploadImage = useCallback(async () => {
    try {
      let data: any = await upload({
        file: uploadPost.imageUrl,
        title: uploadPost.caption,
      });
      if (data?.data?.details === 'Success') {
        setPost({
          imageUrl: null,
          caption: null,
        });
        setImageId(data?.data?.storage_id);
        setImage(data?.data?.url);
        handleImageUploaded();
      }
    } catch (e) {}
  }, [handleImageUploaded, upload, uploadPost.caption, uploadPost.imageUrl]);

  return (
    <Portal>
      <Modal style={styles.modal} onDismiss={onClose} visible={isOpen}>
        {!hasImageUploaded ? (
          <View style={styles.container}>
            <Text style={styles.title}>Upload An Image</Text>
            <View
              style={!uploadPost.imageUrl?.uri ? styles.imageContainer : null}>
              {uploadPost.imageUrl?.uri ? (
                <Image
                  source={{uri: uploadPost.imageUrl?.uri}}
                  style={styles.image}
                />
              ) : (
                <Text>Choose an Image from Camera or Files</Text>
              )}
            </View>
            <TextInput
              placeholder="Type a Caption here"
              mode="outlined"
              onChangeText={handleCaptionChange}
              value={uploadPost.caption}
              style={styles.input}
            />
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
              disabled={uploadPost.imageUrl?.uri || !isLoading ? false : true}
              textColor={Colors.white}
              style={{
                ...styles.confirmUpload,
                backgroundColor: uploadPost.imageUrl?.uri
                  ? Colors.success
                  : Colors.grey,
              }}>
              Upload
            </Button>
          </View>
        ) : (
          <OrderSummary
            handleImageUploaded={handleImageUploaded}
            started_on={started_on}
            ends_on={ends_on}
            mobile_number={mobile_number}
            image={image}
            imageId={`${imageId}`}
            onConfirm={handleOnConfirm}
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
  input: {
    width: '100%',
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
