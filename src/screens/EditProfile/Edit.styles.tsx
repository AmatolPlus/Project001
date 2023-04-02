import {Colors} from '@/utils/colors';
import {Spacing} from '@/utils/constants';
import {Fonts} from '@/utils/fonts';
import {CenterItem} from '@/utils/spacing';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: Spacing.l,
    ...CenterItem(),
  },
  text: {
    ...Fonts.h1,
    fontSize: 72,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.info,
    padding: Spacing.l,
  },
  buttonText: {
    ...Fonts.h3,
    color: Colors.white,
  },
});
