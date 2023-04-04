import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
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
          <Text style={styles.date}>Started on</Text>
          <Text style={styles.date}>
            {moment(created_on).format('MMM Do YY')}
          </Text>
        </View>
      </View>

      <View style={styles.entryFeeContainer}>
        <Text style={styles.entryFeeText}>₹ {entry_fee}</Text>
        <Chip textStyle={styles.chipText} style={styles.chip}>
          Entry Fees
        </Chip>
      </View>
      <View style={styles.dateContainer}>
        <View>
          <Text style={styles.date}>Days</Text>
          <Text style={styles.date}>{days}</Text>
        </View>
        <View>
          <Text style={styles.date}>Ends on</Text>
          <Text style={styles.date}>{moment(ends_on).format('MMM Do YY')}</Text>
        </View>
        <View>
          <Text style={styles.date}>Event By</Text>
          <Text style={styles.date}>{contest_name}</Text>
        </View>
      </View>
      <View style={styles.ball} />
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
  entryFeeContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: Spacing.xs,
    ...VerticalMargin('m'),
  },
  entryFeeText: {
    ...Fonts.h1,
    textAlign: 'center',
    color: Colors.white,
    fontSize: 48,
  },
  date: {...Fonts.sub1, textAlign: 'center', color: Colors.white},
  chipText: {...Fonts.h3, fontSize: fontSize.s1, color: Colors.dark},
  ball: {
    position: 'absolute',
    height: 80,
    right: -70,
    top: 40,
    borderRadius: BorderRadius.l,
    width: 80,
    backgroundColor: Colors.white,
  },
});
