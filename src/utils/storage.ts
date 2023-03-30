import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

export function set(key = 'token', token: any) {
  try {
    storage.set(key, token);
  } catch (error) {}
}

export function get(key = 'token') {
  try {
    let token = storage.getString(key);
    return token;
  } catch (error) {}
}

export default storage;
