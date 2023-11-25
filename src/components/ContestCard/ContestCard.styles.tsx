import {StyleSheet} from 'react-native';

import {Colors} from '@/utils/colors';
import {Fonts, fontSize} from '@/utils/fonts';
import {BorderRadius, Spacing} from '@/utils/constants';
import {VerticalMargin} from '@/utils/spacing';
import {width} from '@/utils/Dimension';

export const styles = StyleSheet.create({
  container: {
    shadowColor: Colors.info,
    shadowOffset: {width: 12, height: 12},
    elevation: 8,
  },
  imageContainer: {
    ...VerticalMargin('s'),
    borderRadius: BorderRadius.m,
    width: width / 1.2,
    backgroundColor: Colors.primary,
    shadowColor: Colors.info,
    elevation: 12,
    shadowOpacity: 8,
    overflow: 'hidden',
    paddingBottom: Spacing.s,
  },
  image: {
    height: 250,
    width: '100%',
    borderBottomColor: Colors.info,
    borderBottomWidth: 0.5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoContainer: {
    marginTop: Spacing.m,
    paddingHorizontal: Spacing.m,
  },

  name: {
    ...Fonts.h3,
    ...VerticalMargin('xs'),
    fontSize: fontSize.h4,
    color: Colors.info,
  },
  priceLabel: {
    ...Fonts.sub1,
    color: Colors.info,
  },
  price: {
    ...Fonts.h4,
    color: Colors.info,
  },
  label: {
    textAlign: 'center',
    ...Fonts.h4,
    fontSize: fontSize.h6,
    color: Colors.danger,
  },
  entryFee: {
    alignSelf: 'center',
    ...Fonts.h4,
    color: Colors.info,
  },
  contestInfoContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: Spacing.xs,
  },
  progressBarContainer: {
    marginTop: Spacing.m,
  },
  buttonText: {...Fonts.h3, fontSize: fontSize.s1, color: Colors.danger},
});
