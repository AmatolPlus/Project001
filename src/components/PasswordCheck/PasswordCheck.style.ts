import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {VerticalMargin} from '@/utils/spacing';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: Spacing.s,
    borderRadius: BorderRadius.xs,
    ...VerticalMargin('s'),
  },
  text: {
    ...Fonts.h3,
    color: Colors.danger,
    fontSize: fontSize.h6,
  },
  button: {
    borderRadius: BorderRadius.xs,
    backgroundColor: Colors.danger,
  },
  buttonText: {
    color: Colors.white,
    ...Fonts.h3,
    fontSize: fontSize.h5,
  },
});
