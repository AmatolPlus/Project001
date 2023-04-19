import React, {useCallback, useMemo, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {ProgressBar} from 'react-native-paper';
import moment from 'moment';
import {FlashList} from '@shopify/flash-list';
import Entypo from 'react-native-vector-icons/Entypo';
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
import {fontSize} from '@/utils/fonts';

export default function Details() {
  const {params}: any = useRoute();
  const id = params?.id;
  const [isPrizeChartShown, setPriceChartShown] = useState(false);
  const {data, refetch, isError, isLoading}: any = useContestDetailQuery(id);
  const [like] = useLikeContestMutation({});
  const [joinEvent]: any = useJoinContestMutation({});
  const [confirmPayment]: any = useConfirmPaymentMutation({});
  const {data: user} = useUserDetailsQuery({});
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const handleConfirmPayment = useCallback(
    async (res: any) => {
      const status = await confirmPayment(res);
      if (status?.data?.details === 'success') {
        refetch();
      }
    },
    [confirmPayment, refetch],
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

  // is joined by me not updating

  const handleJoinEvent = useCallback(async () => {
    try {
      joinEvent({
        contest: id,
        use_wallet: true,
      }).then(handleRazorPayPayment);
    } catch (e) {}
  }, [handleRazorPayPayment, id, joinEvent]);

  const progress = useMemo(
    () => ((data?.joined_list_count / data?.total_competators) * 100) / 100,
    [data?.joined_list_count, data?.total_competators],
  );

  const handlePrizeChartToggle = useCallback(() => {
    setPriceChartShown(!isPrizeChartShown);
  }, [isPrizeChartShown]);

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
    data?.join_end_date,
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
      <View>
        {data?.joined_contest?.length ? (
          <Section>
            <View style={styles.eventHeaderContainer}>
              <View>
                <Text style={styles.eventDetailsHeader}>Posts</Text>
              </View>
              <ParticipantsList data={data?.joined_contest} participants={32} />
            </View>
            <View style={styles.eventDetailsSubHeaderContainer}>
              <Text style={styles.eventDetailsSubHeader}>
                Vote for your favourite posts
              </Text>
              <View>
                <Entypo
                  name="chevron-small-right"
                  size={fontSize.h1}
                  color={Colors.info}
                />
              </View>
            </View>
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
      </View>
      <View>
        <View style={styles.headerContainer}>
          <View style={styles.prizeLinkContainer}>
            <Section>
              <Text style={styles.title}>{data?.concept_name}</Text>
            </Section>
            <Button onPress={handlePrizeChartToggle}>
              <Text style={styles.buttonText}>View Prize Chart</Text>
            </Button>
          </View>
        </View>
        <Section>
          <Text numberOfLines={isExpanded ? undefined : 2} style={styles.desc}>
            {data?.contest_desc}
          </Text>
          {data?.desc?.length > 20 || !isExpanded ? (
            <TouchableOpacity onPress={handleToggleText}>
              <Text style={styles.more}>More</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleToggleText}>
              <Text style={styles.more}>Less</Text>
            </TouchableOpacity>
          )}
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
      </View>
      <View style={styles.contestDetails}>
        <View
          style={[
            styles.note,
            {
              opacity: canJoin || !data?.is_joined_by_me ? 1 : 0.5,
            },
          ]}>
          <View style={styles.noteTextContainer}>
            <Text style={{color: Colors.dark2}}>
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
              onJoinEvent={handleJoinEvent}
              entryFee={data.entry_price}
              contestName={data.concept_name}
            />
          </View>
        </View>

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
