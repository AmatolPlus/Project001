import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {CenterItem, VerticalMargin, VerticalPadding} from '@/utils/spacing';
import {Dimensions, StyleSheet} from 'react-native';

let {width, height} = Dimensions.get('window');

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
  },
  divider: {...VerticalMargin('m')},
  logout: {
    backgroundColor: Colors.danger,
    padding: Spacing.xs,
    borderRadius: BorderRadius.s,
    position: 'absolute',
    bottom: Spacing.xl,
    width: '100%',
    left: Spacing.xl,
  },
  logoutText: {
    ...Fonts.h5,
    color: Colors.white,
  },
});
