import React, {memo, useCallback, useMemo, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {Button, TextInput} from '@/ui';

import UserDetailsModal from '../UserDetailsModal/UserDetailsModal';
import DatePicker from '../DatePicker/DatePicker';
import AddressModal from '../AddressModal/AddressModal';

import {validateUserDetails} from '@/utils/validateUserDetails';
import {Colors} from '@/utils/colors';
import {getFullName} from '@/utils/getFullName';

const PersnolInformation = ({form, onChange, refetch, onSubmit}: any) => {
  const address = form?.address_detail?.street;
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [addressModalVisible, setAddressModalVisible] =
    useState<boolean>(false);
  const [date, setDate] = useState<string>('');
  const [userNameModalVisible, showUserNameModal] = useState<boolean>(false);
  let username = getFullName(form?.first_name, form?.last_name);

  const disabled = useMemo(() => {
    return !validateUserDetails(form?.hobby, form?.youtube_link);
  }, [form]);

  const handleDateChange = useCallback(
    (_date: string) => {
      setDate(_date);
      onChange('birthday', _date);
    },
    [onChange],
  );

  const handleUserNameModal = useCallback(() => {
    showUserNameModal(!userNameModalVisible);
  }, [userNameModalVisible]);

  const handleAddressModalToggle = useCallback(() => {
    setAddressModalVisible(!addressModalVisible);
  }, [addressModalVisible]);

  const handleDatePickerToggle = useCallback(() => {
    setShowDatePicker(!showDatePicker);
  }, [showDatePicker]);

  return (
    <View className="bg-white w-full rounded-md p-4 mb-2">
      <Text className="text-info font-sans-bold text-lg mb-0">
        Personal Information
      </Text>
      <View
        style={{alignItems: 'flex-end'}}
        className="flex-row justify-between w-full">
        <Text className="text-info font-sans">Name</Text>
        <TouchableOpacity onPress={handleUserNameModal}>
          <TextInput
            editable={false}
            cursorColor={Colors.info}
            value={username}
            activeOutlineColor={Colors.white}
            outlineColor={Colors.white}
            className="h-8 p-0 w-48 bg-white text-info font-sans  text-sm border-b-2 border-b-info"
          />
        </TouchableOpacity>
      </View>
      <View
        style={{alignItems: 'flex-end'}}
        className="flex-row justify-between w-full">
        <Text className="text-info font-sans">Hobby</Text>
        <TextInput
          placeholder="xxxxxxx"
          value={form?.hobby}
          onChangeText={val => onChange('hobby', val)}
          cursorColor={Colors.info}
          outlineColor={Colors.white}
          activeOutlineColor={Colors.white}
          className="h-8 p-0 w-48 bg-white text-info font-sans  text-sm border-b-2 border-b-info"
        />
      </View>
      <View
        style={{alignItems: 'flex-end'}}
        className="flex-row justify-between w-full">
        <Text className="text-info font-sans">Date of Birth</Text>
        <TouchableOpacity onPress={handleDatePickerToggle}>
          <TextInput
            value={form?.birthday || date}
            editable={false}
            placeholder="DD/MM/YYYY"
            cursorColor={Colors.info}
            outlineColor={Colors.white}
            activeOutlineColor={Colors.white}
            className="h-8 p-0 w-48 bg-white text-info font-sans  text-sm border-b-2 border-b-info"
          />
        </TouchableOpacity>
      </View>
      <View
        style={{alignItems: 'flex-end'}}
        className="flex-row justify-between w-full">
        <Text className="text-info font-sans">Place</Text>
        <TouchableOpacity onPress={handleAddressModalToggle}>
          <TextInput
            editable={false}
            placeholder="Select Your Region"
            value={
              form?.address_detail &&
              form?.address_detail?.street +
                ', ' +
                form?.address_detail?.city +
                ', ' +
                form?.address_detail?.state
            }
            outlineColor={Colors.white}
            cursorColor={Colors.info}
            activeOutlineColor={Colors.white}
            className="h-8 p-0 w-48 bg-white text-info font-sans  text-sm border-b-2 border-b-info"
          />
        </TouchableOpacity>
      </View>
      <View
        style={{alignItems: 'flex-end'}}
        className="flex-row justify-between w-full">
        <Text className="text-info font-sans">Website</Text>
        <TextInput
          onChangeText={val => onChange('youtube_detail', val)}
          placeholder="http://example.com"
          cursorColor={Colors.info}
          outlineColor={Colors.white}
          activeOutlineColor={Colors.white}
          className="h-8 p-0 w-48 bg-white text-info font-sans  text-sm border-b-2 border-b-info"
        />
      </View>
      <View>
        <Button
          disabled={disabled}
          className="mt-4"
          style={[{backgroundColor: disabled ? Colors.grey : Colors.danger}]}
          textColor={Colors.white}
          onPress={onSubmit}>
          <Text>Update</Text>
        </Button>
      </View>
      <DatePicker
        date={date || form?.birthday}
        visible={showDatePicker}
        onDateChange={handleDateChange}
        onClose={handleDatePickerToggle}
      />
      <AddressModal
        refetch={refetch}
        visible={addressModalVisible}
        onClose={handleAddressModalToggle}
      />
      <UserDetailsModal
        visible={userNameModalVisible}
        onClose={handleUserNameModal}
      />
    </View>
  );
};

export default memo(PersnolInformation);
