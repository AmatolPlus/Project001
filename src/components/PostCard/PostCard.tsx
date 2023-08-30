/* eslint-disable react-native/no-inline-styles */
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import ConfirmLikeModal from '../ConfirmLikeModal/ConfirmLikeModal';
import RankTag from '../RankTag/RankTag';

import {ActivityIndicator, Image, Text} from '@/ui';
import {Fonts, fontSize} from '@/utils/fonts';
import {canLikeEvent} from '@/utils/event';
import {Colors} from '@/utils/colors';

import {IPostCard} from './PostCard.types';
import {styles} from './PostCard.styles';
import PostView from '../PostView/PostView';

const PostCard = ({
  data,
  onLike,
  likeEndDate,
  loading,
  item,
  index,
  small,
}: IPostCard) => {
  const [confirmModalShown, setShowConfirmModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const detailsRef: any = useRef(null);

  const handleOpenPost = useCallback(() => {
    if (detailsRef.current) {
      detailsRef.current?.open();
    }
  }, []);

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
    } catch (error) {}
  }, [onLike, item, liked]);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleOpenPost}
        key={index}
        style={styles(small).postCard}>
        <RankTag rank={item?.rank} />

        <Image
          style={{...StyleSheet.absoluteFillObject}}
          source={{uri: item?.contest_image_url}}
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
                <Text style={{...Fonts.sub1, color: Colors.info}}>
                  {item?.like_count + ' '}
                </Text>
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
                {item?.img_caption}
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
      </TouchableOpacity>
      <PostView
        data={data}
        handleLike={handleOnLike}
        item={item}
        likeEndDate={likeEndDate}
        {...data}
        {...item}
        ref={detailsRef}
      />
    </>
  );
};

export default memo(PostCard);
