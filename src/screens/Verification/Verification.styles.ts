import {Colors} from '@/utils/colors';
import {Spacing} from '@/utils/constants';
import {CenterItem, HorizontalPadding, VerticalMargin} from '@/utils/spacing';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.light,
    ...CenterItem(),
    padding: Spacing.l,
  },
  info: {
    fontSize: Spacing.l,
    margin: Spacing.l,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  root: {padding: 20, minHeight: 300},
  title: {textAlign: 'center', fontSize: 30, fontWeight: 'bold'},
  codeFieldRoot: {
    width: '100%',
  },
  cellRoot: {
    width: 48,
    display: 'flex',
    ...CenterItem(),
    backgroundColor: '#fff',
    height: 60,
    margin: Spacing.xs,
    borderRadius: Spacing.xl,
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    backgroundColor: '#fff',
  },
  submitButtonText: {
    color: Colors.light,
    fontWeight: 'bold',
    fontSize: Spacing.l,
  },
  submitButton: {
    backgroundColor: Colors.success,
    ...HorizontalPadding('m'),
    ...VerticalMargin('m'),
    borderRadius: Spacing.s,
  },
});
