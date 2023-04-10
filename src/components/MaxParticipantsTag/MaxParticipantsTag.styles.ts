import {Colors} from '@/utils/colors';
import {Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: Spacing.xs,
    right: 0,
    backgroundColor: Colors.dark,
    bottom: Spacing.xl,
    position: 'absolute',
    alignItems: 'center',
    zIndex: 1,
  },
  status: {
    ...Fonts.h5,
    fontSize: fontSize.s1,
    color: Colors.white,
  },
});
