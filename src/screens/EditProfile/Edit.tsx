import React from 'react';
import {View, ScrollView} from 'react-native';
import {styles} from './Edit.styles';
import Address from '@/components/Address/Address';
import Social from '@/components/Social/Social';
import UserDetails from '@/components/UserDetail/UserDetails';
import {Button} from 'react-native-paper';
import {Text} from '@/ui';
import {useUpdateUserDetailsQuery} from '@/services/apis/login.api';
import {useSelector} from 'react-redux';

export default function Edit() {
  const {update}: any = useUpdateUserDetailsQuery({});
  const {profile}: any = useSelector(state => state);

  function handleUpdate() {
    try {
      update(profile);
    } catch (error) {}
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.card}>
          <UserDetails />
          <Address />
          <Social />
          <Button onPress={handleUpdate}>
            <Text>Update</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
