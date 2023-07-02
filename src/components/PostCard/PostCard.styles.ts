import {height} from '@/utils/Dimension';
import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
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
  banner: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    position: 'absolute',
    width: '100%',
    alignItems: 'flex-start',
    bottom: 55,
    height: 20,
  },
  bannerText: {
    color: Colors.white,
  },
  likeImage: {
    height: 24,
    width: 24,
  },
  bannerTextAlignment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  likeBtn: {
    borderRadius: BorderRadius.l,
    padding: Spacing.m,
    backgroundColor: Colors.white,
    height: 50,
    width: 50,
    alignItems: 'center',
    position: 'absolute',
    bottom: 100,
    right: Spacing.m,
  },
});
