import {StyleSheet} from 'react-native';

import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {VerticalMargin} from '@/utils/spacing';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: Spacing.xs,
    padding: Spacing.m,
    marginTop: Spacing.xl,
  },
  button: {
    borderRadius: BorderRadius.xs,
    marginTop: Spacing.m,
    ...Fonts.h5,
    color: Colors.white,
    backgroundColor: Colors.info,
    padding: Spacing.s,
  },
  cardItemsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  to: {
    maxWidth: 200,
    color: Colors.info,
    ...Fonts.h3,
    fontSize: fontSize.h4,
  },
  amount: {
    maxWidth: 100,
    color: Colors.info,
    ...Fonts.h3,
    fontSize: fontSize.h5,
  },
  transferredOn: {
    color: Colors.info,
    ...Fonts.sub1,
  },
  buttonContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
  },
});
