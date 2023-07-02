import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts} from '@/utils/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  postCard: {
    height: 300,
    width: 189,
    marginTop: Spacing.xs,
    backgroundColor: Colors.light,
    marginLeft: Spacing.xs,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  likeImage: {
    height: 24,
    width: 24,
  },
  bannerTextAlignment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
    marginTop: Spacing.xs,
  },
  postCardImage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.white,
    gap: 2,
    padding: Spacing.xs,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    justifyContent: 'space-between',
  },
  username: {
    ...Fonts.h6,
  },
  likeBtn: {
    borderRadius: BorderRadius.l,
    padding: Spacing.m,
    backgroundColor: Colors.white,
    height: 50,
    width: 50,
    alignItems: 'center',
    position: 'absolute',
    bottom: 70,
    right: Spacing.m,
  },
});
