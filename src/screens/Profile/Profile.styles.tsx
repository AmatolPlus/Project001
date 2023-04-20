import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {CenterItem, VerticalMargin} from '@/utils/spacing';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: Spacing.xl,
    ...CenterItem(),
  },
  card: {
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
  header: {
    ...Fonts.h3,
  },
  userBioContainer: {gap: Spacing.xs, marginTop: Spacing.m},
  userBio: {
    ...Fonts.h3,
    fontSize: fontSize.h6,
  },
});
