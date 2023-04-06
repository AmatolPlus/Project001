import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts} from '@/utils/fonts';
import {CenterItem, VerticalMargin} from '@/utils/spacing';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: Spacing.xl,
    ...CenterItem(),
  },
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.m,
    padding: Spacing.xl,
    justifyContent: 'space-between',
  },
  divider: {...VerticalMargin('m')},
  logout: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.danger,
    padding: Spacing.xs,
    borderRadius: BorderRadius.s,
    width: '100%',
  },
  logoutText: {
    ...Fonts.h5,
    color: Colors.white,
  },
});
