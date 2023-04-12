import {StyleSheet} from 'react-native';

import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';

export const styles = StyleSheet.create({
  modal: {
    padding: Spacing.xl,
  },
  card: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.m,
    padding: Spacing.xl,
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: Colors.white,
    borderColor: Colors.grey,
    borderRadius: BorderRadius.xs,
    height: Spacing.xl * 2,
    marginTop: Spacing.m,
    paddingHorizontal: Spacing.m,
  },
  updateButton: {
    borderRadius: BorderRadius.xs,
    padding: Spacing.s,
    marginTop: Spacing.m,
  },
  updateText: {
    ...Fonts.h3,
    fontSize: fontSize.h5,
    color: Colors.white,
  },
  error: {
    color: Colors.danger,
    textAlign: 'center',
    ...Fonts.h3,
    fontSize: fontSize.h5,
    marginTop: Spacing.l,
  },
});
