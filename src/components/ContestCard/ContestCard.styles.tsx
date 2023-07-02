import {StyleSheet} from 'react-native';

import {Colors} from '@/utils/colors';
import {Fonts, fontSize} from '@/utils/fonts';
import {BorderRadius, Spacing} from '@/utils/constants';
import {VerticalMargin} from '@/utils/spacing';
import {width} from '@/utils/Dimension';

export const styles = StyleSheet.create({
  imageContainer: {
    ...VerticalMargin('s'),
    borderRadius: BorderRadius.s,
    marginRight: Spacing.m,
    width: width / 1.2,
    borderWidth: 0.5,
    borderColor: Colors.dark2,
    overflow: 'hidden',
    paddingBottom: Spacing.s,
  },
  image: {
    height: 250,
    width: '100%',
    borderBottomColor: Colors.dark2,
    borderBottomWidth: 0.5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoContainer: {
    marginTop: Spacing.m,
    paddingHorizontal: Spacing.l,
  },

  name: {
    ...Fonts.h3,
    ...VerticalMargin('xs'),
    fontSize: fontSize.h4,
    color: Colors.dark,
  },
  priceLabel: {
    ...Fonts.sub1,
    color: Colors.dark,
  },
  price: {
    ...Fonts.h4,
    color: Colors.dark,
  },
  label: {
    textAlign: 'center',
    ...Fonts.sub1,
    color: Colors.dark,
  },
  entryFee: {
    alignSelf: 'center',
    ...Fonts.h5,
    color: Colors.dark,
  },
  contestInfoContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: Spacing.xs,
  },
  progressBarContainer: {
    marginTop: Spacing.m,
  },
  buttonText: {...Fonts.h3, fontSize: fontSize.s1, color: Colors.info},
});
