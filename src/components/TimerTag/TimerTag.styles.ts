import {StyleSheet} from 'react-native';

import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';

export const styles = StyleSheet.create({
  container: {
    padding: Spacing.xs,
    right: 0,
    backgroundColor: Colors.danger,
    bottom: 80,
    borderTopLeftRadius: BorderRadius.xs,
    borderBottomLeftRadius: BorderRadius.xs,
    position: 'absolute',
    alignItems: 'center',
    zIndex: 1,
  },
  endsOn: {
    ...Fonts.h5,
    fontSize: fontSize.s1,
    color: Colors.white,
  },
  timerContainer: {
    display: 'flex',
  },
  text: {
    ...Fonts.h5,
    fontSize: fontSize.s2,
    color: Colors.white,
  },
  status: {
    ...Fonts.h4,
    fontSize: fontSize.h5,
    color: Colors.white,
  },
});
