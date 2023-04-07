import React, {useCallback, useMemo, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {ProgressBar} from 'react-native-paper';

import {useContestDetailQuery} from '@/services/apis/contests.api';
import {Card, Image, ActivityIndicator, Text, Section, Button} from '@/ui';
import {Colors} from '@/utils/colors';
import {styles} from './Details.styles';
import {JoinEvent} from '@/components/JoinEvent/JointEvent';
import Ticket from '@/ui/Ticket';
import PriceChart from '@/ui/PrizeChart';
import {FlashList} from '@shopify/flash-list';
import PostCard from '@/components/PostCard/PostCard';
import {canJoinEvent} from '@/utils/event';
import Chip from '@/ui/Chip';
import {Spacing} from '@/utils/constants';
import moment from 'moment';

export default function Details() {
  const {params}: any = useRoute();
  const id = params?.id;
  const [isPrizeChartShown, setPriceChartShown] = useState(false);
  const {data, isError, isLoading}: any = useContestDetailQuery(id);

  const progress = useMemo(
    () => ((data?.joined_list_count / data?.total_competators) * 100) / 100,
    [data?.joined_list_count, data?.total_competators],
  );

  const handleJoinEvent = useCallback(() => {}, []);
  const handleLike = useCallback((item: any) => {
    if (item?.is_liked_by_me) {
      //apiCall
    }
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isError) {
    return <></>;
  }

  const renderPosts = ({item}: any) => (
    <PostCard
      likeCount={item?.like_count}
      liked={item?.is_liked_by_me}
      contestImage={item?.contest_image_url}
      caption={item?.img_caption}
      onLike={() => {
        handleLike(item);
      }}
    />
  );
  const canJoin = canJoinEvent(
    data?.join_validity_in_days,
    data?.joined_list_count,
    data?.total_competators,
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Image
          source={{
            uri: data?.sample_image_url,
          }}
          style={styles.image}
        />
      </Card>
      <View style={styles.contestDetails}>
        {canJoin ? (
          <Chip
            compact
            textStyle={{color: Colors.white}}
            style={{
              backgroundColor: Colors.danger,
              marginVertical: Spacing.m,
            }}>
            Join date for the contest ended on{' '}
            {moment(data?.join_end_date).format('DD/MM/YYYY')}
          </Chip>
        ) : (
          <></>
        )}
        <View style={styles.headerContainer}>
          <Section>
            <Text style={styles.title}>{data?.concept_name}</Text>
          </Section>
          <Button
            buttonColor={Colors.info}
            style={styles.button}
            onPress={() => setPriceChartShown(!isPrizeChartShown)}>
            <Text style={styles.buttonText}>View Prize Chart</Text>
          </Button>
        </View>
        <Section>
          <Text style={styles.desc}>{data?.contest_desc}</Text>
        </Section>
        <Section>
          <View style={styles.eventAttendees}>
            <Text style={styles.eventAttendeesText}>Event Attendees</Text>
            <Text style={styles.joinedCount}>
              {data?.joined_list_count + '/' + data?.total_competators}
            </Text>
          </View>
          <ProgressBar progress={progress} color={Colors.success} />
        </Section>
        {data?.joined_contest?.length ? (
          <Section>
            <Text style={styles.eventDetailsHeader}>Posts</Text>
            <Text style={styles.eventDetailsSubHeader}>
              Vote for your favourite posts
            </Text>
            <FlashList
              data={data?.joined_contest}
              estimatedItemSize={200}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderPosts}
            />
          </Section>
        ) : (
          <></>
        )}
        <Section>
          <Text style={styles.eventDetailsHeader}>Event Details</Text>
          <Ticket
            contest_name={data?.concept_name}
            ended_on={data?.join_end_date}
            days={data?.join_validity_in_days}
            created_on={data?.published_on}
            entry_fee={data?.entry_price}
          />
        </Section>

        <Section style={styles.termsHeaderContainer}>
          <Text style={styles.termsHeader}>
            Prizepool will depend on how many slots are filled
          </Text>
          <Text style={styles.termsBody}>
            I Confirm that i have read consent and agree to HighFive's user
            agreement & privacy policy. I am legal age & understand that i can
            change my communication preferences anytime in my account settings.
          </Text>
        </Section>
      </View>
      <JoinEvent
        thresholdOccupancy={data?.total_competators}
        currentOccupancy={data?.joined_list_count}
        joinEndDate={data?.join_end_date}
        joinStartDate={data?.publish_on}
        threshold={data?.total_competators}
        onJoinEvent={handleJoinEvent}
      />
      <PriceChart
        data={data?.prize_chart}
        isOpen={isPrizeChartShown}
        setClosed={setPriceChartShown}
      />
    </ScrollView>
  );
}
