import ActivityIndicator from '@/ui/ActvityIndicator';
import {get} from '@/utils/storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';

export default function Launch() {
  const navigation: any = useNavigation();

  useEffect(() => {
    let token = get('token');
    if (token) {
      console.log(token);
      navigation.navigate('Main');
    } else {
      navigation.navigate('Login');
    }
  }, [navigation]);

  return <ActivityIndicator />;
}
