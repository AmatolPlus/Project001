import {StyleSheet} from 'react-native';

import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';

export const styles = StyleSheet.create({
  container: {
    minWidth: '20%',
    padding: Spacing.xs,
    left: Spacing.xs,
    backgroundColor: Colors.white,
    top: Spacing.s,
    borderRadius: BorderRadius.xs,
    position: 'absolute',
    alignItems: 'center',
    zIndex: 1,
  },
  status: {
    ...Fonts.sub1,
    fontSize: fontSize.h6,
    color: Colors.danger,
  },
});
