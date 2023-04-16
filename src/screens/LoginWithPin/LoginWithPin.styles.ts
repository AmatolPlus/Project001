import {Fonts, fontSize} from '@/utils/fonts';
import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';
import {BorderRadius, Spacing} from '../../utils/constants';
import {CenterItem, VerticalMargin} from '../../utils/spacing';

let styles = StyleSheet.create({
  container: {
    ...CenterItem(),
    backgroundColor: Colors.light,
    padding: Spacing.l,
  },
  title: {
    alignSelf: 'center',
    ...Fonts.h1,
  },
  info: {
    textAlign: 'center',
    ...Fonts.h5,
    ...VerticalMargin('l'),
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButton: {
    borderRadius: Spacing.xs,
    marginTop: Spacing.s,
  },
  loginButtonText: {
    ...Fonts.h3,
    fontSize: fontSize.h4,
    color: Colors.white,
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
  codeFieldRoot: {
    width: '100%',
  },
  cellRoot: {
    ...CenterItem(),
    width: 48,
    display: 'flex',
    backgroundColor: Colors.white,
    height: 60,
    margin: Spacing.xs,
    borderRadius: Spacing.xl,
  },
  cellText: {
    ...Fonts.h1,
    color: Colors.dark,
    textAlign: 'center',
  },
  focusCell: {
    backgroundColor: Colors.white,
  },
});

export default styles;
