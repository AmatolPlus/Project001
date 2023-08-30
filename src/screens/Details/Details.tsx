/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
  Share,
  Image,
  StyleSheet,
  Linking,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {FlashList} from '@shopify/flash-list';
import {useNavigation, useRoute} from '@react-navigation/native';

import PostCard from '@/components/PostCard/PostCard';
import ParticipantsList from '@/components/ParticipantsList/ParticipantsList';
import ContestCard from '@/components/ContestCard/ContestCard';
import FinalPrize from '@/components/FinalPrize/FinalPrize';

import {
  ActivityIndicator,
  Snackbar,
  PrizeChart as PriceChart,
  Button,
  Text,
  Section,
} from '@/ui';

import {
  useContestDetailQuery,
  useFinalPrizeQuery,
  useJoinContestMutation,
  useLikeContestMutation,
  useTrackOrderQuery,
} from '@/services/apis/contests.api';
import {useUserDetailsQuery} from '@/services/apis/login.api';

import {styles} from './Details.styles';
import {Colors} from '@/utils/colors';
import {Fonts, fontSize} from '@/utils/fonts';
import {ScreenNames} from '@/utils/screenName';
import {width} from '@/utils/Dimension';
import {canJoinEvent} from '@/utils/event';
import {JoinEvent} from '@/components/JoinEvent/JointEvent';
import {BorderRadius, Spacing} from '@/utils/constants';
import {ContestInfoBanner} from './LikeInfoBanner';
import {useWalletAmountQuery} from '@/services/apis/wallet.api';
import ErrorPage from '@/components/ErrorPage/ErrorPage';
import PostView from '@/components/PostView/PostView';

export default function Details() {
  const navigation: any = useNavigation();
  const {params}: any = useRoute();
  const id: string = params?.id;
  const detailsRef: any = useRef(null);

  const {data: finalPrize}: any = useFinalPrizeQuery(id);
  const {data: user} = useUserDetailsQuery({});
  const [like, {isLoading: isLikeLoading}] = useLikeContestMutation({});
  const {data: walletAmount} = useWalletAmountQuery({});
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [orderId, setOrderId] = useState('');
  const {data, refetch, isError, error, isLoading}: any =
    useContestDetailQuery(id);
  const [joinEvent]: any = useJoinContestMutation();
  const [isPrizeChartShown, setPriceChartShown]: [any, any] = useState(false);

  const {isSuccess, isError: isPhonePeError} = useTrackOrderQuery(orderId, {
    skip: !orderId,
  });

  const handleMorePostsNavigation = useCallback(() => {
    try {
      navigation.navigate(ScreenNames.morePosts, {
        id: data?.id,
        contest_name: data?.concept_name,
        likeEndDate: data?.like_end_date,
      });
    } catch (error) {}
  }, [data?.concept_name, data?.id, data?.like_end_date, navigation]);

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

  const handlePhonePePayment = useCallback(
    (response: any) => {
      if (response?.data?.amount !== 0) {
        // try {
        //   setOrderId(response?.data?.order_tracking_id);
        //   let url = response?.data?.redirect_url;
        //   Linking.openURL(url);
        // } catch (e) {
        //   ToastAndroid.show(
        //     'Please Install PhonePe to continue',
        //     ToastAndroid.LONG,
        //   );
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

  const handlePrizeChartToggle = useCallback(() => {
    setPriceChartShown(!isPrizeChartShown);
  }, [isPrizeChartShown]);

  const handleProfileNavigation = useCallback(() => {
    navigation.navigate(ScreenNames.transactions);
  }, [navigation]);

  const handleJoinEvent = useCallback(
    async (image: any) => {
      try {
        joinEvent({
          contest: id,
          sample_image: image,
          use_wallet: !!(walletAmount?.earned_amount >= data?.entry_price),
        }).then((response: any) => {
          // console.log(response);
          if (response?.data) {
            handlePhonePePayment(response);
          } else {
            ToastAndroid.show(
              'Payment Failed. Please Try Again Later',
              ToastAndroid.LONG,
            );
          }
        });
        refetch();
      } catch (e) {}
    },
    [
      data?.entry_price,
      handlePhonePePayment,
      id,
      joinEvent,
      refetch,
      walletAmount?.earned_amount,
    ],
  );

  useEffect(() => {
    if (isSuccess) {
      ToastAndroid.show(
        'You Post Has Been Uploaded Successfully',
        ToastAndroid.LONG,
      );
    }
    if (isPhonePeError) {
      ToastAndroid.show('Payment Failed. Please Try Again', ToastAndroid.LONG);
    }
  }, [isSuccess, isPhonePeError]);

  if (isLoading) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <ActivityIndicator />
      </View>
    );
  }

  if (isError) {
    return <ErrorPage onReload={refetch} error={error} />;
  }

  const renderPosts = ({item, index}: any) => {
    return (
      <>
        <PostCard
          likeEndDate={data?.like_end_date}
          small={false}
          index={index}
          data={data}
          item={item}
          onLike={handleLike}
          loading={isLikeLoading}
        />
      </>
    );
  };

  const end_date = new Date(data?.join_end_date);

  const canJoin = canJoinEvent(
    data?.join_end_date,
    data?.joined_list_count,
    data?.total_competators,
  );

  return (
    <View className="bg-primary">
      <ScrollView
        key={data?.id}
        refreshControl={
          <RefreshControl
            colors={[Colors.danger, Colors.info]}
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
                width: '100%',
                borderRadius: BorderRadius.s,
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
        <View className="flex items-center">
          <ContestCard
            navigation={null}
            showPrizeChartButton={true}
            width={width / 1.1}
            item={{...data, end_date}}
            showShare={
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
            }
          />
        </View>
        {!data?.is_canceled && (
          <View className="flex-row justify-between m-3">
            <Button onPress={handlePrizeChartToggle}>
              <Text style={styles.buttonText}>View Prize Chart</Text>
            </Button>
            <JoinEvent
              is_free={data?.is_free}
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
                style={{
                  height: 250,
                }}
                keyExtractor={(item: any) => item?.id}
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

        <ContestInfoBanner {...data} canJoin={canJoin} />

        {!data?.is_canceled &&
          finalPrize?.length !== 0 &&
          data?.contest_ended && <FinalPrize data={finalPrize} />}
        {!data?.is_canceled && (
          <PriceChart
            notes={data?.notes}
            members={data?.total_competators}
            data={data?.prize_chart}
            isOpen={isPrizeChartShown}
            setClosed={setPriceChartShown}
          />
        )}
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
