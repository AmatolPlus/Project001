import React, {useCallback, useMemo, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {ProgressBar} from 'react-native-paper';
import moment from 'moment';
import {FlashList} from '@shopify/flash-list';

import {
  useConfirmPaymentMutation,
  useContestDetailQuery,
  useJoinContestMutation,
  useLikeContestMutation,
} from '@/services/apis/contests.api';
import {Card, Image, ActivityIndicator, Text, Section, Button} from '@/ui';
import {Colors} from '@/utils/colors';
import {styles} from './Details.styles';
import {JoinEvent} from '@/components/JoinEvent/JointEvent';
import Ticket from '@/ui/Ticket';
import PriceChart from '@/ui/PrizeChart';
import PostCard from '@/components/PostCard/PostCard';
import {canJoinEvent} from '@/utils/event';
import ParticipantsList from '@/components/ParticipantsList/ParticipantsList';
import RazorPayCheckout from 'react-native-razorpay';
import {useUserDetailsQuery} from '@/services/apis/login.api';

export default function Details() {
  const {params}: any = useRoute();
  const id = params?.id;
  const [isPrizeChartShown, setPriceChartShown] = useState(false);
  const {data, refetch, isError, isLoading}: any = useContestDetailQuery(id);
  const [like] = useLikeContestMutation({});
  const [joinEvent]: any = useJoinContestMutation({});
  const [confirmPayment]: any = useConfirmPaymentMutation({});
  const {data: user} = useUserDetailsQuery({});

  const handleConfirmPayment = useCallback(
    (res: any) => {
      let data: any = confirmPayment(res);
      console.log(data);
    },
    [confirmPayment],
  );

  const handleRazorPayPayment = useCallback(
    async (response: any) => {
      let result = await RazorPayCheckout.open({
        description: 'Join Contest Payment',
        image: data?.sample_image_url,
        name: data?.concept_name,
        key: response?.data?.key,
        prefill: {
          email: user?.email,
          contact: user?.mobile_number,
        },
        amount: response?.data?.amount,
        currency: response?.data?.currency,
        order_id: response?.data?.order_id,
        theme: {
          color: Colors.success,
        },
      }).catch(e => e);
      if (result?.razorpay_payment_id) {
        handleConfirmPayment(result);
      }
    },
    [
      data?.concept_name,
      data?.sample_image_url,
      handleConfirmPayment,
      user?.email,
      user?.mobile_number,
    ],
  );

  const handleJoinEvent = useCallback(async () => {
    try {
      joinEvent({
        contest: 'e61d9a72-f316-48be-ad9d-f7142e03eab2',
        use_wallet: true,
      }).then(handleRazorPayPayment);
    } catch (e) {}
  }, [handleRazorPayPayment, joinEvent]);

  const progress = useMemo(
    () => ((data?.joined_list_count / data?.total_competators) * 100) / 100,
    [data?.joined_list_count, data?.total_competators],
  );

  const handleLike = useCallback(
    async (item: any) => {
      if (!item?.is_liked_by_me) {
        await like({
          contest: item?.contest,
        });
        refetch();
      }
    },
    [like, refetch],
  );

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isError) {
    return <></>;
  }

  const renderPosts = ({item}: any) => {
    return (
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
  };
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
        <View
          style={[
            styles.note,
            {
              backgroundColor: canJoin ? Colors.light : Colors.danger,
            },
          ]}>
          <View style={styles.noteTextContainer}>
            <Text style={{color: canJoin ? Colors.dark2 : Colors.white}}>
              Join date for the contest {canJoin ? 'ends' : 'ended'} on&nbsp;
              <Text style={styles.noteDate}>
                {moment(data?.join_end_date).format('DD MMM YYYY')}
              </Text>
            </Text>
          </View>
          <View>
            <JoinEvent
              thresholdOccupancy={data?.total_competators}
              currentOccupancy={data?.joined_list_count}
              joinEndDate={data?.join_end_date}
              joinStartDate={data?.publish_on}
              onJoinEvent={handleJoinEvent}
              entryFee={data.entry_price}
              contestName={data.concept_name}
            />
          </View>
        </View>

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
            <View style={styles.eventHeaderContainer}>
              <View>
                <Text style={styles.eventDetailsHeader}>Posts</Text>
                <ParticipantsList participants={32} />
              </View>
              <Text color={Colors.info}>More</Text>
            </View>
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
      </View>

      <PriceChart
        data={data?.prize_chart}
        isOpen={isPrizeChartShown}
        setClosed={setPriceChartShown}
      />
    </ScrollView>
  );
}
