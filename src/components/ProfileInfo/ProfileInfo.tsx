import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import {styles} from './ProfileInfo.styles';
import {Image, Text} from '@/ui';
import {Spacing} from '@/utils/constants';
import {Colors} from '@/utils/colors';
import UserDetailsModal from '../UserDetailsModal/UserDetailsModal';
import {IProfileInfo} from './ProfileInfo.types';
import {useUploadProfileImageMutation} from '@/services/apis/login.api';

const USER_IMAGE_PLACEHOLDER =
  'https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg';

const ProfileInfo = ({data, fullName, refetch}: IProfileInfo) => {
  const [userModal, setShowUserModal] = useState(false);
  const [upload, {isLoading}] = useUploadProfileImageMutation({});
  const [image, setImage] = useState();
  const handleModal = useCallback(() => {
    setShowUserModal(!userModal);
  }, [userModal]);

  const handlePickImage = useCallback(() => {
    try {
      launchImageLibrary({
        mediaType: 'photo',
      }).then((res: any) => setImage(res.assets[0]));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (image) {
      upload({
        file: image,
      }).then((d: any) => {
        if (d?.data?.details === 'Success') {
          refetch();
        }
      });
    }
  }, [image, refetch, upload]);

  return (
    <View>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <TouchableOpacity
            style={styles.profileImage}
            onPress={handlePickImage}>
            <Image
              resizeMode="cover"
              source={{uri: data?.profile_image_url || USER_IMAGE_PLACEHOLDER}}
              style={{...StyleSheet.absoluteFillObject}}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.name}>{fullName}</Text>
            <Text style={styles.email}>{data?.email}</Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <Ionicons
            onPress={handleModal}
            name="ios-settings-outline"
            size={Spacing.xl}
            color={Colors.dark}
          />
        </View>
      </View>
      <UserDetailsModal visible={userModal} onClose={handleModal} />
    </View>
  );
};

export default memo(ProfileInfo);
