import {StyleSheet} from 'react-native';

import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts} from '@/utils/fonts';
import {VerticalMargin} from '@/utils/spacing';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
    padding: Spacing.l,
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    padding: Spacing.xs,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    ...Fonts.h1,
  },
  listContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: Colors.white,
    width: '99%',
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: Colors.grey,
    padding: Spacing.m,
  },
  link: {textAlign: 'left', color: Colors.info},
  cardItemsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  date: {
    ...Fonts.h3,
    ...VerticalMargin('m'),
  },
  to: {
    ...Fonts.h6,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: BorderRadius.l,
    marginRight: Spacing.s,
  },
  amount: {
    ...Fonts.h5,
  },
  transferredOn: {
    ...Fonts.sub1,
  },
});
