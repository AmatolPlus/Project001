import {Colors} from '@/utils/colors';
import {Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {VerticalMargin} from '@/utils/spacing';
import moment from 'moment';
import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import Card from './Card';
import Chip from './Chip';
import Text from './Text';

export default function Ticket({
  created_on,
  ends_on,
  entry_fee,
  days,
  contest_name,
}: any) {
  return (
    <Card style={styles.conatainer}>
      <View style={styles.dateContainer}>
        <View>
          <Text style={{...Fonts.sub1, color: Colors.white}}>Started on</Text>
          <Text
            style={{...Fonts.h1, fontSize: fontSize.s1, color: Colors.white}}>
            {moment(created_on).format('MMM Do YY')}
          </Text>
        </View>
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: Spacing.xs,
          ...VerticalMargin('m'),
        }}>
        <Text
          style={{
            ...Fonts.h1,
            textAlign: 'center',
            color: Colors.white,
            fontSize: 48,
          }}>
          ₹ {entry_fee}
        </Text>
        <Chip
          textStyle={{...Fonts.h3, fontSize: fontSize.s1, color: Colors.dark}}
          style={styles.chip}>
          Entry Fees
        </Chip>
      </View>
      <View style={styles.dateContainer}>
        <View>
          <Text
            style={{...Fonts.sub1, textAlign: 'center', color: Colors.white}}>
            Days
          </Text>
          <Text
            style={{...Fonts.h1, fontSize: fontSize.s1, color: Colors.white}}>
            {days}
          </Text>
        </View>
        <View>
          <Text
            style={{...Fonts.sub1, textAlign: 'center', color: Colors.white}}>
            Ends on
          </Text>
          <Text
            style={{...Fonts.h1, fontSize: fontSize.s1, color: Colors.white}}>
            {moment(ends_on).format('MMM Do YY')}
          </Text>
        </View>
        <View>
          <Text
            style={{...Fonts.sub1, textAlign: 'center', color: Colors.dark2}}>
            Event By
          </Text>
          <Text
            style={{...Fonts.sub1, fontSize: fontSize.s1, color: Colors.dark2}}>
            {contest_name}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    gap: Spacing.l,
    padding: Spacing.l,
    shadowColor: Colors.grey,
    borderRadius: Spacing.m,
    elevation: Spacing.m,
    backgroundColor: Colors.dark,
  },
  dateContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  chip: {
    width: 100,
    backgroundColor: Colors.grey,
  },
});
