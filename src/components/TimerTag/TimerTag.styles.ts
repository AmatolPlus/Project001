import {StyleSheet} from 'react-native';

import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';

export const styles = StyleSheet.create({
  container: {
    padding: Spacing.xs,
    width: '50%',
    right: 0,
    backgroundColor: Colors.danger,
    bottom: 80,
    borderTopRightRadius: BorderRadius.xs,
    borderBottomRightRadius: BorderRadius.xs,
    position: 'absolute',
    alignItems: 'center',
    zIndex: 1,
  },
  text: {
    ...Fonts.h3,
    fontSize: fontSize.h5,
    color: Colors.white,
  },
  status: {
    ...Fonts.h4,
    fontSize: fontSize.h5,
    color: Colors.white,
  },
});
