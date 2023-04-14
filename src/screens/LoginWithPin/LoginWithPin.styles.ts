import {Fonts, fontSize} from '@/utils/fonts';
import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';
import {BorderRadius, Spacing} from '../../utils/constants';
import {CenterItem, VerticalMargin} from '../../utils/spacing';

let styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light,
    padding: Spacing.xl * 2,
    ...CenterItem(),
  },
  title: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    color: Colors.purple,
    ...Fonts.title,
  },
  inputContainer: {
    ...VerticalMargin('s'),
  },
  input: {
    ...Fonts.h5,
    width: '100%',
    ...VerticalMargin('xs'),
    borderRadius: BorderRadius.l,
  },
  loginButtonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: Spacing.m,
  },
  loginButton: {
    borderRadius: Spacing.xs,
    marginTop: Spacing.s,
  },
  loginButtonText: {
    ...Fonts.h3,
    fontSize: fontSize.h4,
  },
  close: {
    position: 'absolute',
    top: Spacing.l,
    right: Spacing.l,
  },
  error: {
    color: Colors.danger,
    ...Fonts.h3,
    textAlign: 'center',
    fontSize: fontSize.h5,
    ...VerticalMargin('m'),
  },
  resetPasswordContainer: {
    marginTop: Spacing.m,
  },
});

export default styles;
