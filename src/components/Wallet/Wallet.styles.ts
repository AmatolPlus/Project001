import {Colors} from '@/utils/colors';
import {Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  walletContainer: {
    gap: Spacing.m,
    flexDirection: 'column',
  },
  walletHeader: {
    ...Fonts.h3,
    color: Colors.dark,
  },
  walletAmount: {
    ...Fonts.h1,
    fontSize: fontSize.title,
  },
  withdrawButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
