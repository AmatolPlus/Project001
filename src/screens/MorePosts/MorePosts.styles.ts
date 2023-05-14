import {height} from '@/utils/Dimension';
import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts} from '@/utils/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {flex: 1},
  list: {height: height, width: '100%'},
  buttonContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    marginLeft: Spacing.m,
    marginRight: Spacing.m,

    borderRadius: BorderRadius.xs,
    marginTop: Spacing.m,
    ...Fonts.h5,
    color: Colors.white,
    backgroundColor: Colors.info,
    padding: Spacing.s,
  },
});
