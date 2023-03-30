import {Fonts} from '@/utils/fonts';
import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';
import {Spacing} from '../../utils/constants';
import {CenterItem} from '../../utils/spacing';

let styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light,
    padding: Spacing.l,
    ...CenterItem(),
  },
  title: {
    ...Fonts.h1,
  },
  input: {
    ...Fonts.h5,
    width: '100%',
    margin: Spacing.s,
  },
  loginButton: {
    borderRadius: Spacing.xs,
    alignSelf: 'flex-start',
  },
  loginButtonText: {
    ...Fonts.h3,
  },
});

export default styles;
