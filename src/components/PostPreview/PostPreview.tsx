import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Image} from '@/ui';
import {width} from '@/utils/Dimension';
import {Fonts, fontSize} from '@/utils/fonts';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Colors} from '@/utils/colors';
import ConfirmLikeModal from '../ConfirmLikeModal/ConfirmLikeModal';
import {canLikeEvent} from '@/utils/event';
import AntDesign from 'react-native-vector-icons/AntDesign';
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

export default function PostPreview({
  item,
  likeEndDate,
  handleOnLike,
  isLikeLoading,
  close,
}: any) {
  const [confirmModalShown, setShowConfirmModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const canLike = canLikeEvent(likeEndDate);

  const handleLike = useCallback(() => {
    handleOnLike();
    close();
  }, [close, handleOnLike]);

  useEffect(() => {
    setLiked(item?.is_liked_by_me);
  }, [item]);

  const handleToggleConfirmModal = useCallback(() => {
    if (!liked && canLike) {
      setShowConfirmModal(!confirmModalShown);
    }
  }, [canLike, confirmModalShown, liked]);

  return (
    <View className="h-5/6 overflow-hidden rounded-xl bg-white w-full">
      <TouchableOpacity style={styles.close} onPress={close}>
        <AntDesign color={Colors.white} size={18} name="close" />
      </TouchableOpacity>
      <Image
        resizeMode="contain"
        className={`w-[350] h-full`}
        source={{uri: item?.contest_image_url}}
      />
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
              {formatNumber(item?.like_count) + ' '}
            </Text>
          </>
        )}
      </TouchableOpacity>

      <View style={styles.postCardImage}>
        <View>
          <View style={styles.bannerTextAlignment}>
            <View style={styles.bannerTextAlignment}>
              <Text style={styles.username} numberOfLines={2}>
                @{item?.user?.profile_id || '-'}
              </Text>
            </View>
            <Text
              ellipsizeMode={'tail'}
              numberOfLines={1}
              style={{
                ...Fonts.h3,
                fontSize: fontSize.h6,
                color: Colors.info,
                maxWidth: '70%',
              }}>
              {item?.img_caption}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}></View>
          </View>
          <ConfirmLikeModal
            visible={confirmModalShown}
            onClose={handleToggleConfirmModal}
            onConfirmLike={handleLike}
          />
        </View>
      </View>
    </View>
  );
}
