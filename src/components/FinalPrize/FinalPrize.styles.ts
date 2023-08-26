import {width} from '@/utils/Dimension';
import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 200,
    flex: 1,
    width: width - Spacing.s,
    marginTop: Spacing.l,
  },
  header: {
    ...Fonts.h1,
    marginBottom: Spacing.m,
    color: Colors.info,
    fontSize: fontSize.h3,
  },
  cardContainer: {
    padding: Spacing.m,
    paddingLeft: 0,
    backgroundColor: Colors.light,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: Colors.light,
    gap: 10,
  },
  image: {
    height: Spacing.xl * 2,
    width: Spacing.xl * 2,
    borderRadius: BorderRadius.l,
  },
  info: {marginLeft: Spacing.s},
  username: {
    ...Fonts.h5,
  },
  rank: {
    ...Fonts.h6,
  },
  prize: {
    ...Fonts.h6,
  },
});
