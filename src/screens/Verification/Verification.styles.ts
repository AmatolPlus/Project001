import {Colors} from '@/utils/colors';
import {Spacing} from '@/utils/constants';
import {Fonts} from '@/utils/fonts';
import {CenterItem, HorizontalPadding, VerticalMargin} from '@/utils/spacing';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    ...CenterItem(),
    backgroundColor: Colors.light,
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
    width: '80%',
    alignSelf: 'center',
  },
  cellRoot: {
    ...CenterItem(),
    width: 48,
    display: 'flex',
    backgroundColor: 'transparent',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: Colors.info,
    margin: Spacing.xs,
  },
  cellText: {
    ...Fonts.h2,
    color: Colors.info,
    textAlign: 'center',
  },
  focusCell: {
    backgroundColor: 'transparent',
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
