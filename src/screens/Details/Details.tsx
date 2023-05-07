import React, {useCallback, useMemo, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ProgressBar} from 'react-native-paper';
import moment from 'moment';
import RazorPayCheckout from 'react-native-razorpay';
import {FlashList} from '@shopify/flash-list';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  useConfirmPaymentMutation,
  useContestDetailQuery,
  useFinalPrizeQuery,
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
import {useUserDetailsQuery} from '@/services/apis/login.api';
import {fontSize} from '@/utils/fonts';
import TermsAndConditionsModal from '@/components/TermsAndConditions/TermsAndConditions';
import LikeExpiry from '@/components/LikeExpiry/LikeExpiry';
import {ScreenNames} from '@/utils/screenName';
import CountdownTimer from '@/components/CountdownTImer/CountdownTImer';
import FinalPrize from '@/components/FinalPrize/FinalPrize';

export default function Details() {
  const {params}: any = useRoute();
  const id: string = params?.id;
  const [isPrizeChartShown, setPriceChartShown] = useState(false);
  const {data, refetch, isError, isLoading}: any = useContestDetailQuery(id);
  const [joinEvent]: any = useJoinContestMutation({});
  const [confirmPayment]: any = useConfirmPaymentMutation({});
  const {data: finalPrize}: any = useFinalPrizeQuery(id);
  const {data: user} = useUserDetailsQuery({});
  const [isExpanded, setIsExpanded] = useState(false);
  const navigation = useNavigation();
  const [like, {isLoading: isLikeLoading}] = useLikeContestMutation({});

  const handleMorePostsNavigation = useCallback(() => {
    try {
      navigation.navigate(ScreenNames.morePosts, {
        id: data?.id,
      });
    } catch (error) {}
  }, [data?.id, navigation]);

  const handleToggleText = () => {
    setIsExpanded(!isExpanded);
  };

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

  const handleConfirmPayment = useCallback(
    async (res: any) => {
      const status = await confirmPayment(res);
      refetch();
      if (status?.data?.details === 'Success') {
        ToastAndroid.show(
          'Payment Successfull, Post Has Been Uploaded',
          ToastAndroid.LONG,
        );
      }
    },
    [confirmPayment, refetch],
  );

  const handleRazorPayPayment = useCallback(
    async (response: any) => {
      if (response?.data?.amount !== 0) {
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
      } else {
        ToastAndroid.show(
          'You Post Has Been Uploaded Successfully',
          ToastAndroid.LONG,
        );
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

  const handleJoinEvent = useCallback(
    async (image: any) => {
      try {
        joinEvent({
          contest: id,
          sample_image: image,
          use_wallet: true,
        }).then(handleRazorPayPayment);
      } catch (e) {}
    },
    [handleRazorPayPayment, id, joinEvent],
  );

  const progress = useMemo(
    () => ((data?.joined_list_count / data?.total_competators) * 100) / 100,
    [data?.joined_list_count, data?.total_competators],
  );

  const handlePrizeChartToggle = useCallback(() => {
    setPriceChartShown(!isPrizeChartShown);
  }, [isPrizeChartShown]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isError) {
    return <></>;
  }

  const renderPosts = ({item}: any) => {
    return (
      <PostCard
        likeEndDate={data?.like_end_date}
        onLike={handleLike}
        loading={isLikeLoading}
        likeCount={item?.like_count}
        contestImage={item?.contest_image_url}
        caption={item?.img_caption}
        item={item}
      />
    );
  };

  const canJoin = canJoinEvent(
    data?.join_end_date,
    data?.joined_list_count,
    data?.total_competators,
  );

  const targetDate = new Date(data?.join_end_date);

  return (
    <ScrollView
      key={data?.id}
      refreshControl={
        <RefreshControl
          colors={[Colors.info]}
          refreshing={isLoading || isLikeLoading}
          onRefresh={refetch}
        />
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {isLoading && <ActivityIndicator />}
      <Card style={styles.card}>
        <Image
          source={{
            uri: data?.sample_image_url,
          }}
          style={styles.image}
        />
      </Card>
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
            mobile_number={user?.mobile_number}
            started_on={data?.published_on}
            thresholdOccupancy={data?.total_competators}
            currentOccupancy={data?.joined_list_count}
            joinEndDate={data?.join_end_date}
            onJoinEvent={handleJoinEvent}
            entryFee={data.entry_price}
            contestName={data.concept_name}
          />
        </View>
      </View>
      {data?.joined_contest?.length ? (
        <ParticipantsList
          data={data?.joined_contest}
          participants={data?.joined_contest?.length}
        />
      ) : (
        <></>
      )}

      {!data?.contest_ended && (
        <View style={styles.timerContainer}>
          <Text style={styles.timerHeader}>Contest Ends in</Text>
          <CountdownTimer textStyle={styles.timer} targetDate={targetDate} />
        </View>
      )}

      <View>
        {data?.joined_contest?.length ? (
          <Section>
            <View style={styles.eventHeaderContainer}>
              <View>
                <Text style={styles.eventDetailsHeader}>Posts</Text>
              </View>
            </View>
            <View style={styles.eventDetailsSubHeaderContainer}>
              <Text style={styles.eventDetailsSubHeader}>
                Vote for your favourite posts
              </Text>
              <TouchableOpacity
                onPress={handleMorePostsNavigation}
                style={styles.moreContainer}>
                <Text style={styles.link}>More</Text>
                <Entypo
                  name="chevron-small-right"
                  size={fontSize.h1}
                  color={Colors.info}
                />
              </TouchableOpacity>
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
          {data?.contest_desc?.length > 75 &&
            (!isExpanded ? (
              <Text onPress={handleToggleText} style={styles.more}>
                More
              </Text>
            ) : (
              <Text onPress={handleToggleText} style={styles.more}>
                Less
              </Text>
            ))}
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
        <LikeExpiry like_end_date={data?.like_end_date} />
        {data?.contest_ended && <FinalPrize data={finalPrize} />}

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
        notes={data?.notes}
        members={data?.total_competators}
        data={data?.prize_chart}
        isOpen={isPrizeChartShown}
        setClosed={setPriceChartShown}
      />
      <TermsAndConditionsModal message={data?.tnc} />
    </ScrollView>
  );
}
