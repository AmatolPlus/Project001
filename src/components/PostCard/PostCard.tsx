/* eslint-disable react-native/no-inline-styles */
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {Share, StyleSheet, TouchableOpacity, View} from 'react-native';

import {ActivityIndicator, Image, Text} from '@/ui';
import {Fonts, fontSize} from '@/utils/fonts';
import {canLikeEvent} from '@/utils/event';
import {Colors} from '@/utils/colors';

import {IPostCard} from './PostCard.types';
import {styles} from './PostCard.styles';
import PostView from '../PostView/PostView';
import ConfirmLikeModal from '../ConfirmLikeModal/ConfirmLikeModal';
import RankTag from '../RankTag/RankTag';
import {ScreenNames} from '@/utils/screenName';

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
    if (detailsRef?.current) {
      detailsRef.current?.open();
    }
  }, []);
  const shareLink = async () => {
    try {
      await Share.share({
        message: `https://site.highfive.one/${ScreenNames.postPreview}/${item?.id}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const canLike = canLikeEvent(likeEndDate);

  useEffect(() => {
    setLiked(item?.is_liked_by_me);
  }, [item]);

  const handleToggleConfirmModal = useCallback(() => {
    if (!liked && canLike) {
      setShowConfirmModal(!confirmModalShown);
    }
  }, [canLike, confirmModalShown, liked]);

  const handleOnLike = useCallback(() => {
    try {
      onLike(item, setLiked, liked);
    } catch (error) {}
  }, [onLike, item, liked]);

  return (
    <>
      <TouchableOpacity
        onPress={handleOpenPost}
        key={index}
        style={styles(small).postCard}>
        <RankTag rank={item?.rank} />
        <TouchableOpacity
          className="absolute top-4 right-4 h-6 z-10 w-6"
          onPress={shareLink}>
          <Image
            style={{
              ...StyleSheet.absoluteFillObject,
            }}
            resizeMode="contain"
            className="h-6 w-6"
            source={require('@/assets/images/share.png')}
          />
        </TouchableOpacity>
        <Image
          resizeMode="contain"
          style={{...StyleSheet.absoluteFillObject}}
          source={{uri: item?.contest_image_url}}
        />

        <TouchableOpacity
          activeOpacity={canLike ? 0.7 : 1}
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
