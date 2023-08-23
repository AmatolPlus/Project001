import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import {styles} from './ProfileInfo.styles';
import {Image} from '@/ui';
import {Spacing} from '@/utils/constants';
import {Colors} from '@/utils/colors';
import UserDetailsModal from '../UserDetailsModal/UserDetailsModal';
import {IProfileInfo} from './ProfileInfo.types';
import {useUploadProfileImageMutation} from '@/services/apis/login.api';

const USER_IMAGE_PLACEHOLDER =
  'https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg';

const ProfileInfo = ({data, refetch}: IProfileInfo) => {
  const [userModal, setShowUserModal] = useState(false);
  const [upload] = useUploadProfileImageMutation({});
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
    <View className="bg-white rounded-md justify-center flex-auto flex">
      <View
        style={{alignItems: 'center'}}
        className="flex-row flex-auto ml-8 mt-4 mb-4">
        <Image
          className="h-24 rounded-full w-24 shadow-md shadow-info"
          source={{uri: data?.userImg || USER_IMAGE_PLACEHOLDER}}
        />
        <View className="ml-6">
          <Text className="font-sans-bold text-xl text-info">
            {data?.profile_id}
          </Text>
          <Text className="font-sans-bold text-info text-xl">HIGHFIVE</Text>
        </View>
      </View>
    </View>
  );
};

export default memo(ProfileInfo);
