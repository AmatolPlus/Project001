import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {flexDirection: 'row'},
  profileImage: {
    width: 50,
    borderRadius: BorderRadius.l,
    height: 50,
    marginRight: Spacing.s,
    overflow: 'hidden',
  },
  name: {
    ...Fonts.h3,
    color: Colors.dark,
    fontSize: fontSize.h4,
    marginBottom: Spacing.xs,
  },
  email: {
    ...Fonts.h6,
    color: Colors.dark2,
  },
  iconContainer: {
    display: 'flex',
  },
});
