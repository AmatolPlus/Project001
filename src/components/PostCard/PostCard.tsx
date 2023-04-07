import {Image, Text} from '@/ui';
import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import {styles} from './PostCard.styles';
import {Colors} from '@/utils/colors';
import {Fonts} from '@/utils/fonts';
import {TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {BorderRadius, Spacing} from '@/utils/constants';

interface IPostCard {
  contestImage: string;
  liked: Boolean;
  likeCount: number;
  onLike: () => void;
  caption: string;
}

const PostCard = ({
  contestImage,
  caption,
  liked,
  likeCount,
  onLike,
}: IPostCard) => {
  return (
    <View style={styles.postCard}>
      <Image
        style={{...StyleSheet.absoluteFillObject}}
        source={{uri: contestImage}}
      />

      {!liked ? (
        <TouchableOpacity onPress={onLike} style={styles.likeBtn}>
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
    </View>
  );
};

export default memo(PostCard);
