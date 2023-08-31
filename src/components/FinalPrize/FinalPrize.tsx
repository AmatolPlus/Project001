import React from 'react';
import {ScrollView, View} from 'react-native';

import {Text} from '@/ui';

import Card from '../Card/Card';

import {Colors} from '@/utils/colors';
import {IFinalPrice} from './FinalPrize.types';
import {styles} from './FinalPrize.styles';

export default function FinalPrize({data}: IFinalPrice) {
  // let uniqueContestList = data?.filter(function (item: any, index: string) {
  //   return (
  //     data.findIndex(function (elem: any) {
  //       return elem?.user?.profile_id === item?.user?.profile_id;
  //     }) === index
  //   );
  // });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Final Prize</Text>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: Colors.grey,
        }}
        nestedScrollEnabled>
        {data?.map((item: any) => (
          <Card type={'prize'} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}
