import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

export function setUserToken(token: any) {
  try {
    storage.set('token', token);
  } catch (error) {
    console.log(error);
  }
}

export function getUserToken() {
  try {
    let token = storage.getString('token');
    return token;
  } catch (error) {
    console.log(error);
  }
}
