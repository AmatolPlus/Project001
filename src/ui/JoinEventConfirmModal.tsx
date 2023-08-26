import React, {useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Portal} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import ImageCropPicker from 'react-native-image-crop-picker';

import {useUploadImageMutation} from '@/services/apis/contests.api';

import OrderSummary from '@/components/OrderSummary/OrderSummary';

import {BorderRadius, Spacing} from '@/utils/constants';
import {Colors} from '@/utils/colors';
import {Fonts} from '@/utils/fonts';
import {HorizontalMargin} from '@/utils/spacing';

import {Button, TextInput, Text, Image, Modal} from '@/ui';

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

const HeaderIcon = ({handleClose}: any) => {
  return (
    <TouchableOpacity style={styles.modalCloseIcon} onPress={handleClose}>
      <AntDesign name="arrowleft" size={24} color={Colors.info} />
    </TouchableOpacity>
  );
};

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
    caption: '',
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
    ImagePicker.openCamera({
      mediaType: 'photo',
      cropping: true,
      quality: 0.3,
    }).then((result: any) => {
      handlePostChange('imageUrl', {
        ...result,
        filename: result?.path,
        type: result?.mime,
        uri: result?.path,
      });
    });
  }, [handlePostChange]);

  const pickImageFromLibrary = useCallback(async () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      cropping: true,
      quality: 0.3,
    }).then((result: any) => {
      handlePostChange('imageUrl', {
        ...result,
        filename: result?.path,
        type: result?.mime,
        uri: result?.path,
      });
    });
  }, [handlePostChange]);

  const uploadImage = useCallback(async () => {
    try {
      let data: any = await upload({
        file: uploadPost.imageUrl,
        title: uploadPost.caption || ' ',
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
  }, [handleImageUploaded, upload, uploadPost]);

  return (
    <Portal>
      <Modal style={styles.modal} onDismiss={onClose} visible={isOpen}>
        <HeaderIcon handleClose={onClose} />

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
              activeOutlineColor={Colors.info}
              mode="outlined"
              outlineColor={Colors.info}
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
                  ? Colors.danger
                  : Colors.grey,
              }}>
              Upload
            </Button>
          </View>
        ) : (
          <OrderSummary
            handleImageUploaded={handleImageUploaded}
            started_on={started_on}
            cancel={setImageUploaded}
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
    backgroundColor: Colors.light,
  },
  container: {
    width: '100%',
    padding: Spacing.l,
    borderRadius: Spacing.m,
    backgroundColor: Colors.primary,
  },
  title: {
    color: Colors.info,
    textAlign: 'center',
    ...Fonts.h2,
  },
  input: {
    color: Colors.info,
    backgroundColor: Colors.light,
  },
  imageContainer: {
    height: 300,
    borderRadius: BorderRadius.s,
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
    gap: 4,
  },
  button: {
    backgroundColor: Colors.danger,
    borderRadius: BorderRadius.xs,
    width: '50%',
  },
  confirmUpload: {
    backgroundColor: Colors.danger,
    padding: Spacing.s,
    marginTop: Spacing.m,
    ...HorizontalMargin('m'),
  },
  modalCloseIcon: {
    backgroundColor: Colors.light,
    elevation: 10,
    display: 'flex',
    position: 'absolute',
    top: '-15%',
    left: 0,
    zIndex: 10,
    height: Spacing.xl * 1.5,
    width: Spacing.xl * 1.5,
    borderRadius: BorderRadius.l,
    alignItems: 'center',
    shadowColor: Colors.info,
    justifyContent: 'center',
  },
});

export default JoinEventConfirmModal;
