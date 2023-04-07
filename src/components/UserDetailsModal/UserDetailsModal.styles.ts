import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('window').width - Spacing.xl * 2,
    height: Dimensions.get('window').height / 1.9,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.m,
    padding: Spacing.xl,
    justifyContent: 'space-between',
  },
  updateText: {
    ...Fonts.h3,
    fontSize: fontSize.h5,
    color: Colors.white,
  },
});
