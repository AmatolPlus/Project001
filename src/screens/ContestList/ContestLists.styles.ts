import {height} from '@/utils/Dimension';
import {BorderTopRadius} from '@/utils/borders';
import {Colors} from '@/utils/colors';
import {Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {HorizontalMargin, VerticalMargin} from '@/utils/spacing';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: Spacing.m,
    backgroundColor: Colors.white,
    flex: 1,
  },
  row: {
    display: 'flex',
    flex: 1,
    marginTop: Spacing.xl,
    overflow: 'hidden',
    shadowColor: Colors.dark,
    justifyContent: 'space-around',
    ...BorderTopRadius('m'),
    ...HorizontalMargin('s'),
  },
  imageContainer: {
    flex: 0.5,
    paddingBottom: Spacing.l,
    justifyContent: 'space-between',
    height: height / 4.2,
  },
  image: {
    width: '100%',
    height: '90%',
  },
  title: {
    ...Fonts.h3,
    paddingTop: Spacing.xs,
    fontSize: fontSize.h5,
    marginLeft: Spacing.s,
    ...VerticalMargin('xs'),
  },
});
