import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Dimensions} from 'react-native';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.m,
    padding: Spacing.xl,
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light,
    borderRadius: Spacing.xs,
    padding: Spacing.s,
    height: Spacing.xl,
    marginBottom: Spacing.s,
  },
  modalContainer: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: Colors.white,
    padding: Spacing.xl,
  },
  stateButton: {
    paddingVertical: Spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light,
  },
});
