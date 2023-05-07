import {StyleSheet} from 'react-native';

import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';

export const styles = StyleSheet.create({
  container: {
    padding: Spacing.xs,
    width: '50%',
    left: 0,
    backgroundColor: Colors.dark,
    top: 20,
    borderTopRightRadius: BorderRadius.xs,
    borderBottomRightRadius: BorderRadius.xs,
    position: 'absolute',
    alignItems: 'center',
    zIndex: 1,
  },
  status: {
    ...Fonts.h4,
    fontSize: fontSize.h5,
    color: Colors.white,
  },
});
