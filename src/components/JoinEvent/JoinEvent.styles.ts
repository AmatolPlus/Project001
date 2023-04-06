import {Colors} from '@/utils/colors';
import {Spacing} from '@/utils/constants';
import {Fonts} from '@/utils/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  button: {
    padding: Spacing.m,
  },
  buttonText: {
    ...Fonts.h3,
    color: Colors.white,
  },
});
