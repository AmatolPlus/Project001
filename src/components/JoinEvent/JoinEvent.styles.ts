import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts} from '@/utils/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.m,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginVertical: Spacing.xs,
  },
  deadlineAlert: {
    ...Fonts.h5,
    textAlign: 'center',
    marginVertical: Spacing.xs,
    color: Colors.danger,
  },
  button: {
    padding: Spacing.m,
    borderRadius: BorderRadius.xs,
  },
  buttonText: {
    ...Fonts.h3,
    color: Colors.white,
  },
});
