import {useUserDetailsQuery} from '@/services/apis/login.api';
import ActivityIndicator from '@/ui/ActvityIndicator';
import {get} from '@/utils/storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';

export default function Launch() {
  const navigation: any = useNavigation();
  const {data} = useUserDetailsQuery({});

  useEffect(() => {
    let token = get('token');
    if (token) {
      // console.log(data);
      navigation.navigate('Main');
    } else {
      navigation.navigate('Login');
    }
  }, [data, navigation]);

  return <ActivityIndicator />;
}
