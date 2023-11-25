import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useUserDetailsQuery} from '@/services/apis/login.api';

import {Image} from '@/ui';

import {Colors} from '@/utils/colors';
import {get} from '@/utils/storage';

export default function Launch() {
  const navigation: any = useNavigation();
  const {data} = useUserDetailsQuery({});

  useEffect(() => {
    let token = get('token');
    setTimeout(() => {
      if (token) {
        navigation.navigate('Main');
      } else {
        navigation.navigate('Login');
      }
    }, 1000);
  }, [data, navigation]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
      }}>
      <Image
        resizeMode="contain"
        style={{width: 300, height: 300}}
        source={require('@/assets/images/highfive_launch.jpeg')}
      />
    </View>
  );
}
