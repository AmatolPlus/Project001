import {width} from '@/utils/Dimension';
import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts} from '@/utils/fonts';
import {StyleSheet} from 'react-native';

export const styles = (props: any) =>
  StyleSheet.create({
    postCard: {
      height: 250,
      width: !props ? 189 : width / 2.3,
      backgroundColor: Colors.primary,
      shadowColor: !props ? undefined : Colors.info,
      elevation: !props ? 0 : Spacing.s,
      marginLeft: !props ? Spacing.xs : Spacing.m,
      marginRight: Spacing.xs,
      borderRadius: BorderRadius.m,
      overflow: 'hidden',
      marginTop: Spacing.m,
    },
    likeImage: {
      height: 28,
      width: 28,
    },
    bannerTextAlignment: {
      gap: 4,
      marginTop: Spacing.xs,
    },
    postCardImage: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: Colors.primary,
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
      color: Colors.info,
      ...Fonts.h6,
      maxWidth: '60%',
    },
    likeBtn: {
      borderRadius: BorderRadius.l,
      padding: Spacing.m,
      backgroundColor: Colors.primary,
      zIndex: 1,
      height: 50,
      width: 50,
      alignItems: 'center',
      position: 'absolute',
      bottom: 16,
      right: Spacing.m,
    },
  });
