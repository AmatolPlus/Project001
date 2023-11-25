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
    backgroundColor: Colors.light,
    flex: 1,
  },
  row: {
    display: 'flex',
    flex: 1,
    marginTop: Spacing.xl,
    overflow: 'hidden',
    shadowColor: Colors.info,
    elevation: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'space-around',
    ...BorderTopRadius('m'),
    ...HorizontalMargin('s'),
  },
  imageContainer: {
    flex: 0.5,
    paddingBottom: Spacing.l,
    backgroundColor: Colors.light,
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
    color: Colors.info,
    marginLeft: Spacing.s,
    ...VerticalMargin('xs'),
  },
});
