import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  postCard: {
    height: 250,
    width: 200,
    backgroundColor: Colors.light,
    marginLeft: Spacing.xs,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  postCardImage: {
    position: 'absolute',
    bottom: 0,
    height: 55,
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
    bottom: 65,
    right: Spacing.m,
  },
});
