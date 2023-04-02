import {StyleSheet, Dimensions} from 'react-native';

import {Colors} from '@/utils/colors';
import {Fonts} from '@/utils/fonts';
import {Spacing} from '@/utils/constants';
import {VerticalMargin} from '@/utils/spacing';

export const styles = StyleSheet.create({
  container: {
    padding: Spacing.l,
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  listContainer: {
    paddingBottom: Spacing.l,
  },
  header: {
    ...Fonts.h1,
  },
  button: {
    backgroundColor: Colors.info,
    padding: Spacing.l,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  imageContainer: {
    ...VerticalMargin('s'),
    width: Dimensions.get('window').width / 1.6,
    height: 150,
    borderRadius: Spacing.m,
    marginRight: Spacing.m,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
