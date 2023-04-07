import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {VerticalMargin} from '@/utils/spacing';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
  },
  input: {
    height: 40,
    backgroundColor: Colors.light,
    borderColor: Colors.grey,
    borderRadius: BorderRadius.xs,
    marginBottom: Spacing.m,
  },
  userNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.m,
  },
  username: {
    borderRadius: BorderRadius.xs,
    borderBottomWidth: 0,
    height: 40,
    width: '48%',
    backgroundColor: Colors.light,
  },
  updateButton: {padding: Spacing.s, borderRadius: BorderRadius.xs},
  divider: {...VerticalMargin('m')},
  updateText: {color: Colors.white, ...Fonts.h3, fontSize: fontSize.h5},
});
