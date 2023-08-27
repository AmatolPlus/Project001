import React, {useCallback, useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Portal} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import ImageCropPicker from 'react-native-image-crop-picker';

import OrderSummary from '@/components/OrderSummary/OrderSummary';

import {useUploadImageMutation} from '@/services/apis/contests.api';
import {Button, TextInput, Text, Image, Modal} from '@/ui';

import {BorderRadius, Spacing} from '@/utils/constants';
import {Colors} from '@/utils/colors';
import {Fonts, fontSize} from '@/utils/fonts';
import {HorizontalMargin} from '@/utils/spacing';

interface IJoinEventModal {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: any;
  started_on: string;
  ends_on: string;
  entryFee: number | string;
  contestName: string;
  wallet: string | number;
  is_free: boolean;
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
  is_free,
}: IJoinEventModal) => {
  const [imageId, setImageId] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
  }, []);

  const [uploadPost, setPost]: any = useState({
    imageUrl: undefined,
    caption: '',
  });
  const [upload, {isLoading}] = useUploadImageMutation();
  const [hasImageUploaded, setImageUploaded] = useState(false);

  const handleImageUploaded = useCallback(() => {
    setImageUploaded(!hasImageUploaded);
  }, [hasImageUploaded]);

  const handleOnConfirm = useCallback(
    async (image_id: any) => {
      onConfirm(image_id);
    },
    [onConfirm],
  );

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

        if (is_free) {
          handleOnConfirm(data?.data?.storage_id);
          onClose();
        } else {
          handleImageUploaded();
        }
      }
    } catch (e) {}
  }, [
    handleImageUploaded,
    handleOnConfirm,
    is_free,
    onClose,
    upload,
    uploadPost.caption,
    uploadPost.imageUrl,
  ]);

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
                <Text
                  style={{
                    ...Fonts.h3,
                    fontSize: fontSize.s1,
                    color: Colors.white,
                  }}>
                  Choose from Library
                </Text>
              </Button>
              <Button
                style={styles.button}
                textColor={Colors.white}
                onPress={pickImageCamera}>
                <Text
                  style={{
                    ...Fonts.h3,
                    fontSize: fontSize.s1,
                    color: Colors.white,
                  }}>
                  Take a Photo
                </Text>
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
              <Text
                style={{
                  ...Fonts.h3,
                  fontSize: fontSize.h6,
                  color: Colors.white,
                }}>
                Upload
              </Text>
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
