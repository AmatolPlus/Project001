import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  useLikeContestMutation,
  usePostDetailQuery,
} from '@/services/apis/contests.api';
import {useNavigation, useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {ActivityIndicator, Image} from '@/ui';
import ConfirmLikeModal from '@/components/ConfirmLikeModal/ConfirmLikeModal';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Colors} from '@/utils/colors';
import {Fonts, fontSize} from '@/utils/fonts';
import {canLikeEvent} from '@/utils/event';
import {ScreenNames} from '@/utils/screenName';
import {formatNumber} from '@/utils/formatData';
const styles = StyleSheet.create({
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
    bottom: 18,
    right: Spacing.m,
  },
  close: {
    top: Spacing.s,
    position: 'absolute',
    right: Spacing.s,
    zIndex: 100,
    backgroundColor: Colors.danger,
    padding: Spacing.xs,
    borderRadius: BorderRadius.l,
  },
});

export default function PostDetail() {
  let [showConfirmModal, setShowConfirmModal] = useState(false);
  const {params}: any = useRoute();
  const navigation = useNavigation();
  const {data, refetch} = usePostDetailQuery(params?.id);
  const [liked, setLiked] = useState(false);
  const [like, {isLoading: isLikeLoading}] = useLikeContestMutation({});

  const handleLike = useCallback(async () => {
    setLiked(!liked);
    if (!data?.is_liked_by_me) {
      await like({
        contest_id: params?.id,
      });
    }
    refetch();
  }, [data?.is_liked_by_me, like, liked, params?.id, refetch]);

  const close = useCallback(() => {
    return navigation.navigate(ScreenNames.details, {
      id: data?.contest,
    });
  }, [data?.contest, navigation]);

  useEffect(() => {
    setLiked(data?.is_liked_by_me);
  }, [data]);

  const canLike = canLikeEvent(data?.like_end_date);

  const handleToggleConfirmModal = useCallback(() => {
    if (!liked && canLike) {
      setShowConfirmModal(!showConfirmModal);
    }
  }, [canLike, showConfirmModal, liked]);

  return (
    <View className="h-full flex  overflow-hidden justify-center items-center rounded-xl bg-white w-full">
      <Image
        resizeMode="contain"
        className={'w-full h-full'}
        source={{uri: data?.contest_image_url}}
      />
      <TouchableOpacity style={styles.close} onPress={close}>
        <AntDesign color={Colors.white} size={18} name="close" />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={canLike ? 0.7 : 1}
        onPress={handleToggleConfirmModal}
        style={styles.likeBtn}>
        {isLikeLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            {!liked ? (
              <View className="w-8 h-8 rounded-full overflow-hidden flex items-center">
                <Image
                  resizeMode="contain"
                  source={require('@/assets/images/highfive-unlike.jpeg')}
                  style={styles.likeImage}
                />
              </View>
            ) : (
              <View className="w-8 h-8 rounded-full overflow-hidden flex items-center">
                <Image
                  resizeMode="contain"
                  source={require('@/assets/images/highfive.jpeg')}
                  style={styles.likeImage}
                />
              </View>
            )}
            <Text style={{...Fonts.sub1, color: Colors.info}}>
              {formatNumber(data?.like_count) + ' '}
            </Text>
          </>
        )}
      </TouchableOpacity>

      <View style={styles.postCardImage}>
        <View>
          <View style={styles.bannerTextAlignment}>
            <View style={styles.bannerTextAlignment}>
              <Text style={styles.username} numberOfLines={2}>
                @{data?.user?.profile_id || '-'}
              </Text>
            </View>
            <Text
              ellipsizeMode={'tail'}
              numberOfLines={1}
              className="text-md font-sans-bold text-info max-w-[70%]">
              {data?.img_caption}
            </Text>
          </View>
          <ConfirmLikeModal
            visible={showConfirmModal}
            onClose={handleToggleConfirmModal}
            onConfirmLike={handleLike}
          />
        </View>
      </View>
    </View>
  );
}
