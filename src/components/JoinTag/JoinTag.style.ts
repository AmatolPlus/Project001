import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: Spacing.xs,
    width: '30%',
    left: 0,
    backgroundColor: Colors.info,
    top: 20,
    borderTopRightRadius: BorderRadius.xs,
    borderBottomRightRadius: BorderRadius.xs,
    position: 'absolute',
    alignItems: 'center',
    zIndex: 10,
  },
  status: {
    ...Fonts.h4,
    fontSize: fontSize.h5,
    color: Colors.white,
  },
});
