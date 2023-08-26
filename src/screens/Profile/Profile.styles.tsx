import {height} from '@/utils/Dimension';
import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {VerticalMargin} from '@/utils/spacing';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: Spacing.xl,
    backgroundColor: Colors.white,
  },
  link: {
    marginLeft: Spacing.m,
    color: Colors.danger,
    marginBottom: Spacing.s,
    ...Fonts.h3,
    fontSize: fontSize.h6,
  },
  card: {
    backgroundColor: Colors.white,
  },
  divider: {...VerticalMargin('m')},
  logout: {
    marginBottom: Spacing.xl,
    marginTop: Spacing.m,
  },
  logoutText: {
    ...Fonts.h5,
    color: Colors.danger,
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
