import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: Spacing.l,
  },
  input: {
    height: 40,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: Spacing.m,
    marginBottom: Spacing.m,
  },
});
