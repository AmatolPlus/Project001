import {Colors} from '@/utils/colors';
import {Spacing} from '@/utils/constants';
import {Fonts} from '@/utils/fonts';
import {CenterItem, HorizontalPadding, VerticalMargin} from '@/utils/spacing';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.light,
    ...CenterItem(),
    padding: Spacing.l,
  },
  info: {
    ...Fonts.h5,
    margin: Spacing.l,
    textAlign: 'center',
  },
  root: {padding: Spacing.xl},
  title: {textAlign: 'center', ...Fonts.h1},
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
  submitButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: Spacing.l,
  },
  submitButton: {
    backgroundColor: Colors.success,
    borderRadius: Spacing.s,
    alignSelf: 'flex-end',
    ...HorizontalPadding('m'),
    ...VerticalMargin('m'),
  },
  resendButtonContainer: {
    marginTop: Spacing.l,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resendButton: {
    color: Colors.info,
  },
});
