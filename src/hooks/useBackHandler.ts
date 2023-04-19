import {useEffect} from 'react';
import {Alert, BackHandler} from 'react-native';

const useBackHandler = () => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      Alert.alert(
        'You are exiting the app',
        '',
        [
          {
            text: 'Exit',
            onPress: () => BackHandler.exitApp(),
          },
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
        ],
        {cancelable: true},
      );
      return true;
    });
  }, []);
};

export {useBackHandler};
