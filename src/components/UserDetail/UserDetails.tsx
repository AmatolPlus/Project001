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
  const disabled = useMemo(() => {
    return !validateUserDetails(form?.first_name, form?.last_name);
  }, [form]);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.userNameContainer}>
          <TextInput
            label={'First Name'}
            style={styles.username}
            value={form?.first_name}
            outlineColor={Colors.info}
            activeOutlineColor={Colors.info}
            onChangeText={value => onChange('first_name', value)}
          />
          <TextInput
            label={'Last Name'}
            outlineColor={Colors.info}
            activeOutlineColor={Colors.info}
            style={styles.username}
            value={form?.last_name}
            onChangeText={value => onChange('last_name', value)}
          />
        </View>
        {/* <TextInput
          label={'Email'}
          style={styles.input}
          value={form?.email}
          onChangeText={value => onChange('email', value)}
        /> */}
        {/* <View>
          <GenderSelector
            onChange={handleGenderChange}
            selectedOption={gender || form?.gender}
          />
        </View> */}
        {/* <TextInput
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
        </Pressable> */}
      </View>
      {/* <DatePicker
        date={date || form?.birthday}
        visible={showDatePicker}
        onDateChange={handleDateChange}
        onClose={handleDatePickerToggle}
      /> */}

      <View>
        <Button
          disabled={disabled}
          style={[
            styles.updateButton,
            {backgroundColor: disabled ? Colors.grey : Colors.danger},
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
