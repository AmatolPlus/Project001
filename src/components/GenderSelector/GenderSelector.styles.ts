import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {VerticalMargin} from '@/utils/spacing';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  modal: {
    padding: Spacing.xl,
  },
  card: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.m,
    padding: Spacing.xl,
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    backgroundColor: Colors.light,
    borderColor: Colors.grey,
    borderRadius: BorderRadius.xs,
    marginBottom: Spacing.m,
  },
  option: {
    ...Fonts.h5,
    fontSize: fontSize.h3,
    ...VerticalMargin('m'),
  },
});
