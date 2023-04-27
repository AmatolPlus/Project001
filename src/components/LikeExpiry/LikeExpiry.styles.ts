import {Colors} from '@/utils/colors';
import {Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  note: {
    display: 'flex',
    alignItems: 'center',
    padding: Spacing.m,
    justifyContent: 'space-between',
    marginVertical: Spacing.m,
    flexDirection: 'row',
    backgroundColor: Colors.light,
  },
  noteTextContainer: {width: '70%'},
  noteDate: {
    ...Fonts.h3,
    fontSize: fontSize.h6,
  },
});
