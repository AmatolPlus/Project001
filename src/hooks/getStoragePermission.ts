import {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';

const useStoragePermission = () => {
  useEffect(() => {
    const requestStoragePermission = async () => {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    };

    requestStoragePermission();
  }, []);
};

export {useStoragePermission};
