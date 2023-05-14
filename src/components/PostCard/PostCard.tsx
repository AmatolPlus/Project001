import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import {ActivityIndicator, Image, Text} from '@/ui';
import {styles} from './PostCard.styles';
import {Colors} from '@/utils/colors';
import {Fonts} from '@/utils/fonts';
import {IPostCard} from './PostCard.types';
import ConfirmLikeModal from '../ConfirmLikeModal/ConfirmLikeModal';
import RankTag from '../RankTag/RankTag';
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
      <RankTag rank={item?.rank} />
      {canLike && !liked ? (
        <TouchableOpacity
          onPress={handleToggleConfirmModal}
          style={styles.likeBtn}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Entypo name="thumbs-up" size={22} color={Colors.danger} />
          )}
        </TouchableOpacity>
      ) : (
        <></>
      )}
      {item?.first_name && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>{item?.first_name}</Text>
        </View>
      )}

      <View style={styles.postCardImage}>
        <Text ellipsizeMode={'tail'} numberOfLines={1} style={{...Fonts.h5}}>
          {caption}
        </Text>
        <Text style={{...Fonts.h6, color: Colors.dark2}}>
          {likeCount} LIKES
        </Text>
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
