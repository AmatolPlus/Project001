import React, {memo, useMemo} from 'react';
import TextInput from '@/ui/TextInput';
import {styles} from './UserDetails.styles';
import {View} from 'react-native';
import {Button, Text} from '@/ui';

import {validateUserDetails} from '@/utils/validateUserDetails';
import {Colors} from '@/utils/colors';
import {IuserDetails} from './UserDetail.types';

const UserDetails = ({form, onChange, onSubmit}: IuserDetails) => {
  const disabled = useMemo(() => {
    return !validateUserDetails(
      form?.first_name,
      form?.last_name,
      form?.gender,
      form?.hobby,
      form?.birthday,
      form?.email,
    );
  }, [form]);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.userNameContainer}>
          <TextInput
            label={'First Name'}
            style={styles.username}
            value={form?.first_name}
            onChangeText={value => onChange('first_name', value)}
          />
          <TextInput
            label={'Last Name'}
            style={styles.username}
            value={form?.last_name}
            onChangeText={value => onChange('last_name', value)}
          />
        </View>

        <TextInput
          label={'Email'}
          style={styles.input}
          value={form?.email}
          onChangeText={value => onChange('email', value)}
        />
        <TextInput
          label={'Gender'}
          style={styles.input}
          value={form?.gender}
          onChangeText={value => onChange('gender', value)}
        />
        <TextInput
          label={'Hobby'}
          style={styles.input}
          value={form?.hobby}
          onChangeText={value => onChange('hobby', value)}
        />
        <TextInput
          label={'Birthday'}
          style={styles.input}
          value={form?.birthday}
          onChangeText={value => onChange('birthday', value)}
        />
      </View>
      <View>
        <Button
          disabled={disabled}
          style={[
            styles.updateButton,
            {backgroundColor: disabled ? Colors.danger : Colors.success},
          ]}
          textColor={Colors.white}
          onPress={onSubmit}>
          <Text style={styles.updateText}>Update</Text>
        </Button>
      </View>
    </View>
  );
};

export default memo(UserDetails);
