import {height} from '@/utils/Dimension';
import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {VerticalMargin} from '@/utils/spacing';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: Spacing.xl * 1.5,
  },
  link: {
    color: Colors.info,
    marginBottom: Spacing.s,
  },
  card: {},
  divider: {...VerticalMargin('m')},
  logout: {},
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
