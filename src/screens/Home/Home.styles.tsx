import {StyleSheet} from 'react-native';

import {Colors} from '@/utils/colors';
import {Fonts, fontSize} from '@/utils/fonts';
import {BorderRadius, Spacing} from '@/utils/constants';
import {VerticalMargin} from '@/utils/spacing';
import {height, width} from '@/utils/Dimension';

export const styles = StyleSheet.create({
  container: {
    padding: Spacing.l,
    height: height,
    width: width,
    backgroundColor: Colors.light,
    paddingBottom: Spacing.xl * 6,
  },
  listContainer: {
    paddingBottom: Spacing.l,
  },
  header: {
    ...Fonts.h2,
    fontSize: fontSize.h5,
  },
  button: {
    backgroundColor: Colors.info,
    padding: Spacing.l,
  },
  imageContainer: {
    ...VerticalMargin('s'),
    width: 300,
    height: 300,
    borderRadius: BorderRadius.s,
    marginRight: Spacing.m,
    borderWidth: 0.5,
    borderColor: Colors.dark2,
    overflow: 'hidden',
  },
  image: {
    height: '80%',
    width: '100%',
    borderBottomColor: Colors.dark2,
    borderBottomWidth: 0.5,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoContainer: {
    gap: 4,
    marginTop: Spacing.m,
    paddingHorizontal: Spacing.l,
  },
  eventInfo: {},
  name: {
    ...Fonts.h3,
    fontSize: fontSize.h6,
    color: Colors.dark,
  },
  priceLabel: {
    ...Fonts.h3,
    fontSize: fontSize.h6,
    color: Colors.dark,
  },
  price: {
    ...Fonts.h3,
    fontSize: fontSize.h6,
    color: Colors.dark,
  },
});
