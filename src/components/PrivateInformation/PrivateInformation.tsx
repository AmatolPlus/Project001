import React, {memo, useCallback, useMemo, useState} from 'react';
import {Text, View} from 'react-native';

import {Button, TextInput} from '@/ui';

import {validateUserEmailAndPhone} from '@/utils/validateUserDetails';
import {Colors} from '@/utils/colors';
import DatePicker from '../DatePicker/DatePicker';
import GenderSelector from '../GenderSelector/GenderSelector';

const PrivateInformation = ({form, onChange, onSubmit}: any) => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [gender, setGender] = useState<string>();
  let styles = {};

  const disabled = useMemo(() => {
    return !validateUserEmailAndPhone(
      form?.email,
      form?.mobile_number,
      form?.gender,
    );
  }, [form]);

  const handleGenderChange = useCallback(
    (option: string) => {
      setGender(option);
      onChange('gender', option);
    },
    [onChange],
  );

  return (
    <View className="bg-white w-full mt-0 rounded-md p-4">
      <Text className="text-info font-sans-bold text-lg mb-0">
        Private Information
      </Text>
      <View
        style={{alignItems: 'flex-end'}}
        className="flex-row justify-between w-full">
        <Text className="text-info font-sans">Email</Text>
        <TextInput
          cursorColor={Colors.info}
          placeholder="example@example.com"
          value={form?.email}
          outlineColor={Colors.white}
          activeOutlineColor={Colors.white}
          onChangeText={val => onChange('email', val)}
          className="h-8 p-0  text-sm bg-white border-b-2 border-b-info w-52"
        />
      </View>
      <View
        style={{alignItems: 'flex-end'}}
        className="flex-row justify-between w-full">
        <Text className="text-info font-sans">Gender</Text>
        <GenderSelector
          onChange={handleGenderChange}
          selectedOption={gender || form?.gender}
        />
      </View>
      <View
        style={{alignItems: 'flex-end'}}
        className="flex-row justify-between w-full">
        <Text className="text-info font-sans">Phone</Text>
        <TextInput
          maxLength={10}
          keyboardType="number-pad"
          placeholder="+91 00000 00000"
          value={form?.mobile_number}
          onChangeText={val => onChange('mobile_number', val)}
          cursorColor={Colors.info}
          outlineColor={Colors.white}
          activeOutlineColor={Colors.white}
          className="h-8 p-0 w-52 bg-white text-info font-sans  text-sm border-b-2 border-b-info"
        />
      </View>
      {/* <Button
        disabled={disabled}
        className="mt-4"
        style={[{backgroundColor: disabled ? Colors.grey : Colors.danger}]}
        textColor={Colors.white}
        onPress={onSubmit}>
        <Text>Update</Text>
      </Button> */}
    </View>
  );
};

export default memo(PrivateInformation);
