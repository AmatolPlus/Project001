import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {ActivityIndicator, Image, Text} from '@/ui';
import {styles} from './PostCard.styles';
import {Fonts} from '@/utils/fonts';
import {IPostCard} from './PostCard.types';
import ConfirmLikeModal from '../ConfirmLikeModal/ConfirmLikeModal';
import {canLikeEvent} from '@/utils/event';

const PostCard = ({
  contestImage,
  caption,
  likeCount,
  likeEndDate,
  onLike,
  loading,
  item,
}: IPostCard) => {
  const [confirmModalShown, setShowConfirmModal] = useState(false);
  const [liked, setLiked] = useState(false);

  const canLike = canLikeEvent(likeEndDate);
  useEffect(() => {
    setLiked(item?.is_liked_by_me);
  }, [item]);

  const handleToggleConfirmModal = useCallback(() => {
    setShowConfirmModal(!confirmModalShown);
  }, [confirmModalShown]);

  const handleOnLike = useCallback(() => {
    try {
      onLike(item, setLiked, liked);
      handleToggleConfirmModal();
    } catch (error) {}
  }, [onLike, item, liked, handleToggleConfirmModal]);

  return (
    <View style={styles.postCard}>
      <Image
        style={{...StyleSheet.absoluteFillObject}}
        source={{uri: contestImage}}
      />
      {canLike && !liked ? (
        <TouchableOpacity
          onPress={handleToggleConfirmModal}
          style={styles.likeBtn}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Image
              resizeMode="contain"
              source={require('@/assets/images/highfive.png')}
              style={styles.likeImage}
            />
          )}
        </TouchableOpacity>
      ) : (
        <></>
      )}

      <View style={styles.postCardImage}>
        <View>
          <View style={styles.bannerTextAlignment}>
            <Text
              ellipsizeMode={'tail'}
              numberOfLines={1}
              style={{...Fonts.h4}}>
              {caption}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{...Fonts.h4}}>{likeCount}</Text>
              <Image
                resizeMode="contain"
                source={require('@/assets/images/highfive.png')}
                style={styles.likeImage}
              />
            </View>
          </View>
          <View style={styles.bannerTextAlignment}>
            <Text style={styles.username}>{item?.user?.profile_id || '-'}</Text>
            <Text>{`#${item?.rank}` || '-'}</Text>
          </View>
        </View>
      </View>
      <ConfirmLikeModal
        visible={confirmModalShown}
        onClose={handleToggleConfirmModal}
        onConfirmLike={handleOnLike}
      />
    </View>
  );
};

export default memo(PostCard);
