import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {VerticalMargin, VerticalPadding} from '@/utils/spacing';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
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
    marginBottom: Spacing.s,
    color: Colors.dark2,
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
    backgroundColor: Colors.success,
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
    color: Colors.dark2,
  },
  date: {
    ...Fonts.h4,
    ...VerticalMargin('xs'),
    fontSize: fontSize.h5,
    color: Colors.dark2,
  },

  entryFeeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  entryFee: {
    ...Fonts.h4,
    ...VerticalPadding('s'),

    color: Colors.dark2,
    fontSize: fontSize.h5,
  },
  wallet: {
    ...Fonts.h3,
    fontSize: fontSize.h5,
  },
});
