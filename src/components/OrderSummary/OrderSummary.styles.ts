import {StyleSheet} from 'react-native';
import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {VerticalMargin, VerticalPadding} from '@/utils/spacing';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.info,
    elevation: 8,
    justifyContent: 'space-between',
    padding: Spacing.xl,
    borderRadius: BorderRadius.s,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.m,
  },
  info: {
    ...Fonts.h6,
    marginLeft: Spacing.xs,
  },
  link: {
    color: Colors.info,
  },
  title: {
    ...Fonts.h3,
    color: Colors.info,
    marginBottom: Spacing.s,
  },
  image: {
    width: 42,
    borderRadius: BorderRadius.l,
    height: 42,
  },
  buttonContainer: {
    marginLeft: Spacing.l,
  },
  changeButton: {
    ...Fonts.h3,
    color: Colors.info,
    fontSize: fontSize.h6,
  },
  button: {
    backgroundColor: Colors.danger,
    borderRadius: BorderRadius.xs,
  },
  buttonText: {
    ...Fonts.h3,
    fontSize: fontSize.h6,
    color: Colors.white,
  },
  divider: {height: 0.5, ...VerticalMargin('s')},
  text: {
    ...Fonts.h3,
    ...VerticalPadding('s'),
  },
  name: {
    ...Fonts.h4,
    ...VerticalMargin('xs'),
    fontSize: fontSize.h4,
    color: Colors.info,
  },
  date: {
    ...Fonts.h4,
    ...VerticalMargin('xs'),
    fontSize: fontSize.h5,
    color: Colors.info,
  },

  entryFeeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  entryFee: {
    ...Fonts.h4,
    ...VerticalPadding('s'),
    color: Colors.info,
    fontSize: fontSize.h5,
  },
  wallet: {
    ...Fonts.h3,
    fontSize: fontSize.h5,
  },
});
