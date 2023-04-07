import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateBirthday,
  updateEmail,
  updateFirstName,
  updateGender,
  updateHobby,
  updateLastName,
} from '@/services/reducers/profile.slice';
import TextInput from '@/ui/TextInput';
import {styles} from './UserDetails.styles';
import {View} from 'react-native';

const UserDetails = () => {
  const dispatch = useDispatch();
  const {profile}: any = useSelector(state => state);

  const handleFirstName = useCallback(
    (val: string) => {
      dispatch(updateFirstName(val));
    },
    [dispatch],
  );

  const handleLastName = useCallback(
    (val: string) => {
      dispatch(updateLastName(val));
    },
    [dispatch],
  );

  const handleEmail = useCallback(
    (val: string) => {
      dispatch(updateEmail(val));
    },
    [dispatch],
  );

  const handleGender = useCallback(
    (val: string) => {
      dispatch(updateGender(val));
    },
    [dispatch],
  );
  const handleHobby = useCallback(
    (val: string) => {
      dispatch(updateHobby(val));
    },
    [dispatch],
  );

  const handleBirthday = useCallback(
    (val: string) => {
      dispatch(updateBirthday(val));
    },
    [dispatch],
  );

  return (
    <>
      <View style={styles.userNameContainer}>
        <TextInput
          label={'First Name'}
          style={styles.username}
          value={profile.first_name}
          onChangeText={handleFirstName}
        />
        <TextInput
          label={'Last Name'}
          style={styles.username}
          value={profile.last_name}
          onChangeText={handleLastName}
        />
      </View>

      <TextInput
        label={'Email'}
        style={styles.input}
        value={profile.email}
        onChangeText={handleEmail}
      />
      <TextInput
        label={'Gender'}
        style={styles.input}
        value={profile.gender}
        onChangeText={handleGender}
      />
      <TextInput
        label={'Hobby'}
        style={styles.input}
        value={profile.hobby}
        onChangeText={handleHobby}
      />
      <TextInput
        label={'Birthday'}
        style={styles.input}
        value={profile.birthday}
        onChangeText={handleBirthday}
      />
    </>
  );
};

export default UserDetails;
