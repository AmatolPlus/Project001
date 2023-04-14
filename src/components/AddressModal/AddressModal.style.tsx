import {width} from '@/utils/Dimension';
import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  card: {
    width: width - Spacing.xl * 2,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.m,
    padding: Spacing.xl,
    justifyContent: 'space-between',
  },
  updateButton: {
    borderRadius: BorderRadius.xs,
    padding: Spacing.s,
  },
  updateText: {
    ...Fonts.h3,
    fontSize: fontSize.h5,
    color: Colors.white,
    marginTop: Spacing.xs,
  },
  link: {textAlign: 'left', color: Colors.info},
});
