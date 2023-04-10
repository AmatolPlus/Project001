import {width} from '@/utils/Dimension';
import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: Spacing.l,
  },
  input: {
    height: Spacing.xl * 2,
    backgroundColor: Colors.white,
    borderColor: Colors.grey,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: Spacing.m,
    marginBottom: Spacing.m,
  },
  stateContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.m,
  },
  stateButton: {
    width: width / 2.8,
    height: 50,
    backgroundColor: Colors.white,
  },
  cityInput: {},
});
