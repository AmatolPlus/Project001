/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState} from 'react';
import {
  Pressable,
  RefreshControl,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
  Share,
  Image,
  StyleSheet,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  useContestDetailQuery,
  useFinalPrizeQuery,
  useJoinContestMutation,
  useLikeContestMutation,
} from '@/services/apis/contests.api';

import PriceChart from '@/ui/PrizeChart';
import {ActivityIndicator, Button, Text, Section} from '@/ui';
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
import {BorderRadius, Spacing} from '@/utils/constants';
import Snackbar from '@/ui/SnackBar';

export default function Details() {
  const {params}: any = useRoute();
  const id: string = params?.id;
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const {data, refetch, isError, isLoading}: any = useContestDetailQuery(id);
  const [joinEvent]: any = useJoinContestMutation();
  const [isPrizeChartShown, setPriceChartShown]: [any, any] = useState(false);
  const {data: finalPrize}: any = useFinalPrizeQuery(id);
  const {data: user} = useUserDetailsQuery({});
  const navigation: any = useNavigation();
  const [like, {isLoading: isLikeLoading}] = useLikeContestMutation({});

  const handleMorePostsNavigation = useCallback(() => {
    try {
      navigation.navigate(ScreenNames.morePosts, {
        id: data?.id,
        contest_name: data?.concept_name,
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
    <View className="bg-primary">
      <ScrollView
        key={data?.id}
        refreshControl={
          <RefreshControl
            colors={[Colors.primary, Colors.info]}
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
        <View style={{display: 'flex', alignItems: 'center'}}>
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
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 12,
            }}>
            <Button onPress={handlePrizeChartToggle}>
              <Text style={styles.buttonText}>View Prize Chart</Text>
            </Button>
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
                style={{
                  height: 250,
                }}
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
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: Colors.info,
            padding: 2,
          }}>
          {!data?.is_cancelled && (
            <>
              <View style={{width: '50%'}}>
                <View
                  style={[
                    styles.note,
                    {
                      opacity: canJoin || !data?.is_joined_by_me ? 1 : 0.5,
                    },
                  ]}>
                  <View style={styles.noteTextContainer}>
                    <Text style={{color: Colors.info}}>
                      Join date for the contest {canJoin ? 'ends' : 'ended'}{' '}
                      on&nbsp;
                      <Text style={styles.noteDate}>
                        {moment(data?.join_end_date).format('DD MMM YYYY')}
                      </Text>
                    </Text>
                  </View>
                </View>
                <TermsAndConditionsModal message={data?.tnc} />
              </View>
              <View style={{width: '50%', alignItems: 'center'}}>
                <View style={styles.contestDetails}>
                  <LikeExpiry like_end_date={data?.like_end_date} />
                </View>
              </View>
            </>
          )}
        </View>
        <View style={styles.footer}></View>
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
