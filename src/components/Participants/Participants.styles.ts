import {height} from '@/utils/Dimension';
import {Colors} from '@/utils/colors';
import {BorderRadius} from '@/utils/constants';
import {Fonts} from '@/utils/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: height / 19,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    position: 'relative',
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    color: Colors.info,
    ...Fonts.h5,
    marginRight: '42%',
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.l,
    borderWidth: BorderRadius.xs - 2,
    borderColor: Colors.white,
  },
});
