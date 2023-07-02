import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {VerticalMargin} from '@/utils/spacing';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  modal: {padding: Spacing.xl},
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.m,
    padding: Spacing.xl,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {...Fonts.h5, marginRight: Spacing.xl},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noteContainer: {
    backgroundColor: Colors.warning,
    padding: Spacing.m,
    ...VerticalMargin('m'),
    borderRadius: BorderRadius.m,
  },
  note: {
    ...Fonts.h3,
    color: Colors.white,
    fontSize: fontSize.h5,
  },
  button: {
    borderRadius: BorderRadius.xs,
    marginTop: Spacing.l,
    backgroundColor: Colors.success,
  },
  buttonText: {
    ...Fonts.h3,
    fontSize: fontSize.h6,
    color: Colors.white,
    marginTop: Spacing.xs,
  },
});
