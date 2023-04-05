import React from 'react';
import {View} from 'react-native';

import {getFullName} from '@/utils/getFullName';
import {styles} from './Profile.styles';
import Divider from '@/ui/Divider';
import {useWalletAmountQuery} from '@/services/apis/wallet.api';
import Wallet from '@/components/Wallet';
import ProfileInfo from '@/components/ProfileInfo/ProfileInfo';
import {Card} from 'react-native-paper';
import {Button, Text} from '@/ui';
import {Fonts, fontSize} from '@/utils/fonts';
import {Spacing} from '@/utils/constants';

const data = {
  email: 'unknown2007@gmail.com',
  country_code: '+91',
  mobile_number: '9844381101',
  unique_number: '334855165105307281364631818355745169601',
  profile_id: 'HFA2E09687',
  birthday: '2023-04-05',
  gender: 'Male',
  lang: 'sfddfafa',
  hobby: 'sdfffdaad',
  category: 'Individual',
  profile_image_url:
    'http://15.207.45.120/static/media/profile_pics/icons8-cap-64_1.png',
  facebook_detail: {},
  instagram_detail: {},
  youtube_detail: {},
  address_detail: {},
  first_name: 'unknown',
  last_name: '2007',
};

export default function Profile() {
  const {data: wallet} = useWalletAmountQuery({});
  const fullName = getFullName(data.first_name, data.last_name);

  console.log(wallet);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ProfileInfo data={data} fullName={fullName} />
        <Divider style={styles.divider} />
        <Wallet wallet={wallet} />
        <Divider style={styles.divider} />
        <View>
          <Text style={{...Fonts.h3}}>About me</Text>
          <View style={{gap: Spacing.xs, marginTop: Spacing.m}}>
            <Text>
              <Text
                style={{
                  ...Fonts.h3,
                  fontSize: fontSize.h6,
                }}>
                contact on:{' '}
              </Text>
              {data.mobile_number}
            </Text>
            <Text>
              <Text
                style={{
                  ...Fonts.h3,
                  fontSize: fontSize.h6,
                }}>
                Account type:{' '}
              </Text>
              {data.category}
            </Text>
            <Text>
              <Text
                style={{
                  ...Fonts.h3,
                  fontSize: fontSize.h6,
                }}>
                Hobbies:{' '}
              </Text>
              {data.hobby}
            </Text>
            <Text>
              <Text
                style={{
                  ...Fonts.h3,
                  fontSize: fontSize.h6,
                }}>
                Gender:{' '}
              </Text>
              {data.gender}
            </Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <Button style={styles.logout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </Button>
      </View>
    </View>
  );
}
