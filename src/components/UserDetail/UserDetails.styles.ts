import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {VerticalMargin} from '@/utils/spacing';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {},
  input: {
    ...Fonts.h5,
    backgroundColor: Colors.white,
    borderColor: Colors.grey,
    borderRadius: BorderRadius.xs,
    marginBottom: Spacing.s,
  },

  userNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.m,
  },
  username: {
    borderRadius: BorderRadius.xs,
    borderBottomWidth: 0,
    width: '48%',
    backgroundColor: Colors.light,
  },
  updateButton: {
    padding: Spacing.s,
    marginTop: Spacing.s,
    borderRadius: BorderRadius.xs,
  },
  divider: {...VerticalMargin('m')},
  updateText: {color: Colors.white, ...Fonts.h3, fontSize: fontSize.h5},
});
