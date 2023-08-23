import {FlatList, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {
  useLikeContestMutation,
  useMorePostsQuery,
} from '@/services/apis/contests.api';
import PostCard from '@/components/PostCard/PostCard';
import {styles} from './MorePosts.styles';
import {useRoute} from '@react-navigation/native';
import {Spacing} from '@/utils/constants';
import {Text} from '@/ui';
import {Colors} from '@/utils/colors';

export default function MorePosts() {
  const route: any = useRoute();
  const [page, setPage] = useState(1);
  const {id, likeEndDate} = route?.params;
  const {data, refetch} = useMorePostsQuery({id, page});
  const [like, {isLoading}] = useLikeContestMutation({});

  const pageInfo = data?.current || '<Page 1 of 2>';
  const currentPage = parseInt(pageInfo.split(' ')[1], 10);
  const maxPages = parseInt(pageInfo.split(' ')[3].slice(0, -1), 10);

  const handleChangePage = useCallback(
    (action: 'next' | 'previous') => {
      setPage(action === 'next' ? page + 1 : page - 1);
    },
    [page],
  );

  const renderFooter = useCallback(() => {
    return (
      <View style={styles.buttonContainer}>
        {maxPages !== currentPage && (
          <Text style={styles.button} onPress={() => handleChangePage('next')}>
            Next
          </Text>
        )}
        {page !== 1 && (
          <Text
            style={styles.button}
            onPress={() => handleChangePage('previous')}>
            Previous
          </Text>
        )}
      </View>
    );
  }, [currentPage, handleChangePage, maxPages, page]);

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
      likeEndDate={likeEndDate}
      contest_ended={false}
    />
  );

  return (
    <View style={{flex: 1, backgroundColor: Colors.light}}>
      <View style={styles.listContainer}>
        <FlatList
          ListFooterComponent={maxPages > 1 ? renderFooter : null}
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
