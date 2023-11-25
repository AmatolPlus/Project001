import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts} from '@/utils/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {},
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deadlineAlert: {
    ...Fonts.h5,
    textAlign: 'center',
    marginVertical: Spacing.xs,
    color: Colors.danger,
  },
  button: {
    borderRadius: BorderRadius.xs,
  },
  buttonText: {
    color: Colors.white,
  },
});
