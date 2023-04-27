import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import {Image, Text} from '@/ui';
import {styles} from './PostCard.styles';
import {Colors} from '@/utils/colors';
import {Fonts} from '@/utils/fonts';
import {IPostCard} from './PostCard.types';
import ConfirmLikeModal from '../ConfirmLikeModal/ConfirmLikeModal';
import {useLikeContestMutation} from '@/services/apis/contests.api';

const PostCard = ({contestImage, caption, likeCount, item}: IPostCard) => {
  const [confirmModalShown, setShowConfirmModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [like] = useLikeContestMutation({});

  const handleLike = useCallback(
    async (Item: any) => {
      setLiked(!liked);
      if (!Item?.is_liked_by_me) {
        await like({
          contest_id: Item?.id,
        });
      }
    },
    [like, liked],
  );

  useEffect(() => {
    setLiked(item?.is_liked_by_me);
  }, [item]);

  const handleToggleConfirmModal = useCallback(() => {
    setShowConfirmModal(!confirmModalShown);
  }, [confirmModalShown]);

  const handleOnLike = useCallback(() => {
    try {
      handleLike(item);
      handleToggleConfirmModal();
    } catch (error) {}
  }, [handleLike, handleToggleConfirmModal, item]);

  return (
    <View style={styles.postCard}>
      <Image
        style={{...StyleSheet.absoluteFillObject}}
        source={{uri: contestImage}}
      />

      {!liked ? (
        <TouchableOpacity
          onPress={handleToggleConfirmModal}
          style={styles.likeBtn}>
          <Entypo name="thumbs-up" size={22} color={Colors.danger} />
        </TouchableOpacity>
      ) : (
        <></>
      )}
      <View style={styles.postCardImage}>
        <Text style={{...Fonts.h4}}>{caption}</Text>
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
