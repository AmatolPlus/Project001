/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState} from 'react';
import {
  Pressable,
  RefreshControl,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
// import RazorPayCheckout from 'react-native-razorpay';
import {FlashList} from '@shopify/flash-list';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  // useConfirmPaymentMutation,
  useContestDetailQuery,
  useFinalPrizeQuery,
  useJoinContestMutation,
  useLikeContestMutation,
} from '@/services/apis/contests.api';

import {ActivityIndicator, Text, Section} from '@/ui';
import {Colors} from '@/utils/colors';
import {styles} from './Details.styles';
import PostCard from '@/components/PostCard/PostCard';
import ParticipantsList from '@/components/ParticipantsList/ParticipantsList';
import {useUserDetailsQuery} from '@/services/apis/login.api';
import {Fonts, fontSize} from '@/utils/fonts';
import TermsAndConditionsModal from '@/components/TermsAndConditions/TermsAndConditions';
import LikeExpiry from '@/components/LikeExpiry/LikeExpiry';
import {ScreenNames} from '@/utils/screenName';
import FinalPrize from '@/components/FinalPrize/FinalPrize';
import {ContestCard} from '@/components/ContestCard/ContestCard';
import {width} from '@/utils/Dimension';
import {canJoinEvent} from '@/utils/event';
import moment from 'moment';
import {JoinEvent} from '@/components/JoinEvent/JointEvent';
import {Spacing} from '@/utils/constants';
import {Share} from 'react-native';
import Snackbar from '@/ui/SnackBar';

export default function Details() {
  const {params}: any = useRoute();
  const id: string = params?.id;
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const {data, refetch, isError, isLoading}: any = useContestDetailQuery(id);
  const [joinEvent]: any = useJoinContestMutation();
  // const [confirmPayment]: any = useConfirmPaymentMutation({});
  const {data: finalPrize}: any = useFinalPrizeQuery(id);
  const {data: user} = useUserDetailsQuery({});
  const navigation: any = useNavigation();
  const [like, {isLoading: isLikeLoading}] = useLikeContestMutation({});

  const handleMorePostsNavigation = useCallback(() => {
    try {
      navigation.navigate(ScreenNames.morePosts, {
        id: data?.id,
        likeEndDate: data?.like_end_date,
      });
    } catch (error) {}
  }, [data?.id, data?.like_end_date, navigation]);

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

  // const handleConfirmPayment = useCallback(
  //   async (res: any) => {
  //     const status = await confirmPayment(res);
  //     refetch();
  //     if (status?.data?.details === 'Success') {
  //       ToastAndroid.show(
  //         'Payment Successfull, Post Has Been Uploaded',
  //         ToastAndroid.LONG,
  //       );
  //     }
  //   },
  //   [confirmPayment, refetch],
  // );

  const shareLink = async () => {
    try {
      await Share.share({
        message: `https://site.highfive.one/DetailsScreen/${id}`,
      });
    } catch (error) {}
  };

  const handleToggleSnackBar = useCallback(() => {
    setSnackbarVisible(!snackbarVisible);
  }, [snackbarVisible]);

  const handleRazorPayPayment = useCallback(
    async (response: any) => {
      if (response?.data?.amount !== 0) {
        // let result = await RazorPayCheckout.open({
        //   description: 'Join Contest Payment',
        //   image: data?.sample_image_url,
        //   name: data?.concept_name,
        //   key: response?.data?.key,
        //   prefill: {
        //     email: user?.email,
        //     contact: user?.mobile_number,
        //   },
        //   amount: response?.data?.amount,
        //   currency: response?.data?.currency,
        //   order_id: response?.data?.order_id,
        //   theme: {
        //     color: Colors.success,
        //   },
        // // });
        // if (result?.razorpay_payment_id) {
        //   handleConfirmPayment(result);
        // }
        handleToggleSnackBar();
      } else {
        ToastAndroid.show(
          'You Post Has Been Uploaded Successfully',
          ToastAndroid.LONG,
        );
      }
    },
    [handleToggleSnackBar],
  );

  const handleProfileNavigation = useCallback(() => {
    navigation.navigate(ScreenNames.profile);
  }, [navigation]);

  const handleJoinEvent = useCallback(
    async (image: any) => {
      try {
        joinEvent({
          contest: id,
          sample_image: image,
          use_wallet: true,
        }).then((response: any) => {
          if (response?.data) {
            handleRazorPayPayment(response);
          }
        });
      } catch (e) {}
    },
    [handleRazorPayPayment, id, joinEvent],
  );

  console.log(data);

  if (isLoading) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <ActivityIndicator />
      </View>
    );
  }

  if (isError) {
    return <></>;
  }

  const renderPosts = ({item}: any) => {
    return (
      <PostCard
        contest_ended={data?.contest_ended}
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

  const end_date = new Date(data?.join_end_date);

  const canJoin = canJoinEvent(
    data?.join_end_date,
    data?.joined_list_count,
    data?.total_competators,
  );

  return (
    <View>
      <ScrollView
        style={{backgroundColor: Colors.white}}
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
        {data?.is_canceled && (
          <View
            style={[
              styles.note,
              {
                backgroundColor: Colors.danger,
                opacity: canJoin || !data?.is_joined_by_me ? 1 : 0.5,
              },
            ]}>
            <View style={styles.noteTextContainer}>
              <Text style={{color: Colors.white, ...Fonts.h6}}>
                {data?.canceled_message[0]?.message_on_contest_canceled_heading}
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  ...Fonts.h6,
                  marginTop: Spacing.m,
                }}>
                {
                  data?.canceled_message[0]
                    ?.message_on_contest_canceled_description
                }
              </Text>
            </View>
          </View>
        )}

        <ContestCard
          navigation={null}
          showPrizeChartButton={!data?.is_canceled}
          width={width / 1.1}
          item={{...data, end_date}}
        />

        {!data?.is_canceled && (
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
        {data?.joined_contest?.length ? (
          <ParticipantsList data={data?.joined_contest} />
        ) : (
          <></>
        )}
        <View
          style={[
            styles.note,
            {
              opacity: canJoin || !data?.is_joined_by_me ? 1 : 0.5,
            },
          ]}>
          <View style={styles.noteTextContainer}>
            <Text style={{color: Colors.dark2}}>
              The Total Number of People Going To Get The Prize Are{' '}
              <Text style={styles.noteDate}>
                {data?.total_eligible_joiners_for_prize}
              </Text>
            </Text>
          </View>
        </View>
        {!data?.is_cancelled && (
          <>
            <View
              style={[
                styles.note,
                {
                  opacity: canJoin || !data?.is_joined_by_me ? 1 : 0.5,
                },
              ]}>
              <View style={styles.noteTextContainer}>
                <Text style={{color: Colors.dark2}}>
                  Join date for the contest {canJoin ? 'ends' : 'ended'}{' '}
                  on&nbsp;
                  <Text style={styles.noteDate}>
                    {moment(data?.join_end_date).format('DD MMM YYYY')}
                  </Text>
                </Text>
              </View>
            </View>
            <View style={styles.contestDetails}>
              <LikeExpiry like_end_date={data?.like_end_date} />
            </View>
          </>
        )}

        {!data?.is_canceled &&
          finalPrize?.length !== 0 &&
          data?.contest_ended && <FinalPrize data={finalPrize} />}

        <View style={styles.footer}>
          <TermsAndConditionsModal message={data?.tnc} />
          <Pressable onPress={shareLink}>
            <Text style={styles.link}>Share this event</Text>
          </Pressable>
        </View>
      </ScrollView>
      <Snackbar
        style={styles.snackBar}
        onDismiss={handleToggleSnackBar}
        duration={1000}
        visible={snackbarVisible}>
        <View>
          <Text style={styles.snackbarText}>
            You don't have minimun balance.{' '}
            <Text style={styles.snackBarLink} onPress={handleProfileNavigation}>
              Get Credit Here
            </Text>
          </Text>
        </View>
      </Snackbar>
    </View>
  );
}
