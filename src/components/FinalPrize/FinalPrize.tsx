import {ScrollView, View} from 'react-native';
import React from 'react';
import {IFinalPrice} from './FinalPrize.types';
import {styles} from './FinalPrize.styles';
import {Text} from '@/ui';
import {Colors} from '@/utils/colors';
import Card from '../Card/Card';

export default function FinalPrize({data}: IFinalPrice) {
  var uniqueContestList = data?.filter(function (item: any, index: string) {
    return (
      data.findIndex(function (elem: any) {
        return elem?.user?.profile_id === item?.user?.profile_id;
      }) === index
    );
  });

  console.log('prize:', data);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Final Prize</Text>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: Colors.grey,
        }}
        nestedScrollEnabled>
        {uniqueContestList?.map((item: any) => (
          <Card type={'prize'} item={item} />
        ))}
      </ScrollView>
    </View>
  );
}
