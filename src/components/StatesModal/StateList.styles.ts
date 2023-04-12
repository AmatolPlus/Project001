import {StyleSheet} from 'react-native';

import {height, width} from '@/utils/Dimension';
import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';

export const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.m,
    padding: Spacing.xl,
    justifyContent: 'space-between',
  },
  modalContainer: {
    height: height,
    width: width,
    backgroundColor: Colors.white,
    padding: Spacing.xl,
  },

  stateButton: {
    width: width / 2.8,
    height: 50,
    backgroundColor: Colors.white,
  },
});
