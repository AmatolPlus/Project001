import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {VerticalMargin, VerticalPadding} from '@/utils/spacing';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginHorizontal: Spacing.l,
    justifyContent: 'space-between',
    padding: Spacing.xl,
    borderRadius: BorderRadius.s,
  },
  buttonContainer: {paddingTop: Spacing.l, flexDirection: 'row'},
  button: {
    marginTop: Spacing.m,
    borderRadius: BorderRadius.xs,
    marginHorizontal: Spacing.s,
  },
  buttonText: {
    ...Fonts.h3,
    color: Colors.white,
    fontSize: fontSize.h6,
  },
  divider: {height: 0.5, ...VerticalMargin('s')},
  text: {
    ...Fonts.h3,
    ...VerticalPadding('s'),
  },
  nameContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  info: {
    ...Fonts.h3,
    fontSize: fontSize.h4,
    color: Colors.dark,
  },
  name: {
    ...Fonts.h2,
    fontSize: fontSize.h3,
  },
  entryFeeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...VerticalPadding('s'),
  },
  entryFee: {
    ...Fonts.h3,
    fontSize: fontSize.h5,
  },
  wallet: {
    ...Fonts.h3,
    fontSize: fontSize.h5,
  },
});
