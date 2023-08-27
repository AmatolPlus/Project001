/* eslint-disable react-native/no-inline-styles */
import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import ConfirmLikeModal from '../ConfirmLikeModal/ConfirmLikeModal';
import RankTag from '../RankTag/RankTag';

import {ActivityIndicator, Image, Text} from '@/ui';
import {Fonts, fontSize} from '@/utils/fonts';
import {canLikeEvent} from '@/utils/event';
import {Colors} from '@/utils/colors';

import {IPostCard} from './PostCard.types';
import {styles} from './PostCard.styles';

const PostCard = ({
  contestImage,
  caption,
  likeCount,
  likeEndDate,
  onLike,
  loading,
  item,
  index,
  small,
}: IPostCard) => {
  const [confirmModalShown, setShowConfirmModal] = useState(false);
  const [liked, setLiked] = useState(false);

  const canLike = canLikeEvent(likeEndDate);
  useEffect(() => {
    setLiked(item?.is_liked_by_me);
  }, [item]);

  const handleToggleConfirmModal = useCallback(() => {
    if (!liked) {
      setShowConfirmModal(!confirmModalShown);
    }
  }, [confirmModalShown, liked]);

  const handleOnLike = useCallback(() => {
    try {
      onLike(item, setLiked, liked);
      handleToggleConfirmModal();
    } catch (error) {}
  }, [onLike, item, liked, handleToggleConfirmModal]);

  return (
    <View key={index} style={styles(small).postCard}>
      <RankTag rank={item?.rank} />

      <Image
        style={{...StyleSheet.absoluteFillObject}}
        source={{uri: contestImage}}
      />
      {canLike ? (
        <TouchableOpacity
          onPress={handleToggleConfirmModal}
          style={styles(small).likeBtn}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <>
              {!liked ? (
                <View className="w-8 h-8 rounded-full overflow-hidden flex items-center">
                  <Image
                    resizeMode="contain"
                    source={require('@/assets/images/highfive-unlike.jpeg')}
                    style={styles(small).likeImage}
                  />
                </View>
              ) : (
                <View className="w-8 h-8 rounded-full overflow-hidden flex items-center">
                  <Image
                    resizeMode="contain"
                    source={require('@/assets/images/highfive.jpeg')}
                    style={styles(small).likeImage}
                  />
                </View>
              )}
              <Text style={{...Fonts.sub1}}>{likeCount + ' '}</Text>
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
              <Text style={styles(small).username} numberOfLines={1}>
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
