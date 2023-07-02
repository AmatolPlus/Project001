import React, {memo, useCallback, useMemo, useState} from 'react';
import {Pressable, View} from 'react-native';

import {IuserDetails} from './UserDetail.types';
import {styles} from './UserDetails.styles';
import {Button, Text} from '@/ui';
import TextInput from '@/ui/TextInput';

import {validateUserDetails} from '@/utils/validateUserDetails';
import {Colors} from '@/utils/colors';
import DatePicker from '../DatePicker/DatePicker';
import GenderSelector from '../GenderSelector/GenderSelector';

const UserDetails = ({form, onChange, onSubmit}: IuserDetails) => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [date, setDate] = useState<string>('');
  const [gender, setGender] = useState<string>();

  const disabled = useMemo(() => {
    return !validateUserDetails(
      form?.first_name,
      form?.last_name,
      form?.gender,
      form?.hobby,
      form?.birthday,
      form?.email,
      form?.profile_id,
    );
  }, [form]);

  const handleDateChange = useCallback(
    (_date: string) => {
      setDate(_date);
      onChange('birthday', _date);
    },
    [onChange],
  );

  const handleGenderChange = useCallback(
    (option: string) => {
      setGender(option);
      onChange('gender', option);
    },
    [onChange],
  );

  const handleDatePickerToggle = useCallback(() => {
    setShowDatePicker(!showDatePicker);
  }, [showDatePicker]);

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
          label={'Username'}
          style={styles.input}
          value={form?.profile_id}
          onChangeText={value => onChange('profile_id', value)}
        />
        <Text style={styles.info}>
          Username should only alphabets and , @ + - _
        </Text>
        <TextInput
          label={'Email'}
          style={styles.input}
          value={form?.email}
          onChangeText={value => onChange('email', value)}
        />
        <View>
          <GenderSelector
            onChange={handleGenderChange}
            selectedOption={gender || form?.gender}
          />
        </View>
        <TextInput
          label={'Hobby'}
          style={styles.input}
          value={form?.hobby}
          onChangeText={value => onChange('hobby', value)}
        />
        <Pressable onPress={handleDatePickerToggle}>
          <TextInput
            editable={false}
            label={'BirthDay'}
            style={styles.input}
            value={date || form?.birthday}
          />
        </Pressable>
      </View>
      <DatePicker
        date={date || form?.birthday}
        visible={showDatePicker}
        onDateChange={handleDateChange}
        onClose={handleDatePickerToggle}
      />

      <View>
        <Button
          disabled={disabled}
          style={[
            styles.updateButton,
            {backgroundColor: disabled ? Colors.grey : Colors.success},
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
