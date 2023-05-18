import {Colors} from '@/utils/colors';
import {Spacing, BorderRadius} from '@/utils/constants';
import {Fonts} from '@/utils/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 10,
  },
  cardContainer: {
    padding: Spacing.m,
    paddingLeft: 0,
    backgroundColor: Colors.white,
  },
  image: {
    height: Spacing.xl * 2,
    width: Spacing.xl * 2,
    borderRadius: BorderRadius.l,
  },
  info: {marginLeft: Spacing.s},
  username: {
    ...Fonts.h5,
  },
  rank: {
    ...Fonts.h6,
  },
  prize: {
    ...Fonts.h6,
  },
});
