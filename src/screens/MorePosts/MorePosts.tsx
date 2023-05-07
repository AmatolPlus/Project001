import {FlatList, View} from 'react-native';
import React, {useCallback} from 'react';
import {
  useLikeContestMutation,
  useMorePostsQuery,
} from '@/services/apis/contests.api';
import PostCard from '@/components/PostCard/PostCard';
import {styles} from './MorePosts.styles';
import {useRoute} from '@react-navigation/native';
import {Spacing} from '@/utils/constants';

export default function MorePosts() {
  const route: any = useRoute();
  const id = route?.params?.id;
  const {data, refetch} = useMorePostsQuery(id);
  const [like, {isLoading}] = useLikeContestMutation({});

  const handleLike = useCallback(
    async (post: any, setLiked: any, liked: any) => {
      setLiked(!liked);
      if (!post?.is_liked_by_me) {
        await like({
          contest_id: post?.id,
        }).then(() => refetch());
      }
    },
    [like, refetch],
  );

  const renderPosts = ({item}: any) => (
    <PostCard
      contestImage={item?.contest_image_url}
      likeCount={item?.like_count}
      item={item}
      caption={item?.img_caption}
      onLike={handleLike}
      loading={isLoading}
      likeEndDate={item?.like_end_date}
    />
  );

  return (
    <View style={{flex: 1}}>
      <View style={styles.listContainer}>
        <FlatList
          contentContainerStyle={{paddingBottom: Spacing.xl}}
          style={styles.list}
          numColumns={2}
          data={data?.results}
          showsHorizontalScrollIndicator={false}
          renderItem={renderPosts}
        />
      </View>
    </View>
  );
}
