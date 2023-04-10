import React, {memo, useCallback, useState} from 'react';
import {View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {styles} from './ProfileInfo.styles';
import {Image, Text} from '@/ui';
import {Spacing} from '@/utils/constants';
import {Colors} from '@/utils/colors';
import UserDetailsModal from '../UserDetailsModal/UserDetailsModal';
import {IProfileInfo} from './ProfileInfo.types';

const ProfileInfo = ({data, fullName}: IProfileInfo) => {
  const [userModal, setShowUserModal] = useState(false);

  const handleModal = useCallback(() => {
    setShowUserModal(!userModal);
  }, [userModal]);

  return (
    <View>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Image
            resizeMode="contain"
            source={{uri: data?.profile_image_url}}
            style={styles.profileImage}
          />
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
