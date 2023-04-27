import {View} from 'react-native';
import React from 'react';
import {useMorePostsQuery} from '@/services/apis/contests.api';
import PostCard from '@/components/PostCard/PostCard';
import {FlashList} from '@shopify/flash-list';
import {styles} from './MorePosts.styles';

export default function MorePosts() {
  const {data} = useMorePostsQuery({});

  const renderPosts = ({item}: any) => {
    return (
      <PostCard
        likeCount={item?.like_count}
        contestImage={item?.contest_image_url}
        caption={item?.img_caption}
        item={item}
      />
    );
  };

  return (
    <View>
      <View style={styles.listContainer}>
        <FlashList
          style={styles.list}
          numColumns={2}
          data={data?.results}
          estimatedItemSize={200}
          showsHorizontalScrollIndicator={false}
          renderItem={renderPosts}
        />
      </View>
    </View>
  );
}
