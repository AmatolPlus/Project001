import React from 'react';
import {Image, Text} from '@/ui';
import {View} from 'react-native';
import {styles} from './ProfileInfo.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Spacing} from '@/utils/constants';
import {Colors} from '@/utils/colors';

const ProfileInfo = ({data, fullName}: any) => {
  return (
    <View>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Image
            resizeMode="contain"
            source={{uri: data.profile_image_url}}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.name}>{fullName}</Text>
            <Text style={styles.email}>{data.email}</Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <Ionicons
            name="ios-settings-outline"
            size={Spacing.xl}
            color={Colors.dark}
          />
        </View>
      </View>
    </View>
  );
};

export default ProfileInfo;
