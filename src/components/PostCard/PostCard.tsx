import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {ActivityIndicator, Image, Text} from '@/ui';
import {styles} from './PostCard.styles';
import {Fonts, fontSize} from '@/utils/fonts';
import {IPostCard} from './PostCard.types';
import ConfirmLikeModal from '../ConfirmLikeModal/ConfirmLikeModal';
import {canLikeEvent} from '@/utils/event';
import RankTag from '../RankTag/RankTag';
import {Colors} from '@/utils/colors';

const PostCard = ({
  contestImage,
  caption,
  likeCount,
  likeEndDate,
  onLike,
  loading,
  item,
  small,
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
    <View style={styles(small).postCard}>
      <RankTag rank={item?.rank} />

      <Image
        style={{...StyleSheet.absoluteFillObject}}
        source={{uri: contestImage}}
      />
      {canLike && !liked ? (
        <TouchableOpacity
          onPress={handleToggleConfirmModal}
          style={styles(small).likeBtn}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <>
              <Image
                resizeMode="contain"
                source={require('@/assets/images/highfive.png')}
                style={styles(small).likeImage}
              />
              <Text style={{...Fonts.h4}}>{likeCount + ' '}</Text>
            </>
          )}
        </TouchableOpacity>
      ) : (
        <></>
      )}

      <View style={styles(small).postCardImage}>
        <View>
          <View style={styles(small).bannerTextAlignment}>
            <View style={styles(small).bannerTextAlignment}>
              <Text style={styles(small).username}>
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
              {caption}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}></View>
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
