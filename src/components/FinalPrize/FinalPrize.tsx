import {ScrollView, View} from 'react-native';
import React, {useCallback} from 'react';
import {IFinalPrice} from './FinalPrize.types';
import {styles} from './FinalPrize.styles';
import {Image, Text} from '@/ui';
import {Colors} from '@/utils/colors';
import Card from '../Card/Card';

export default function FinalPrize({data}: IFinalPrice) {
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
