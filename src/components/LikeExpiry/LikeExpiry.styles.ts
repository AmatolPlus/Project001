import {Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  note: {
    padding: Spacing.m,
  },
  noteTextContainer: {width: '100%'},
  noteDate: {
    ...Fonts.h3,
    fontSize: fontSize.h6,
  },
});
