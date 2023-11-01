/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {ProgressBar} from 'react-native-paper';

import JoinTag from '../JoinTag/JoinTag';
import CountdownTimer from '../CountdownTImer/CountdownTImer';

import {Image} from '@/ui';
import {styles} from './ContestCard.styles';
import {Fonts, fontSize} from '@/utils/fonts';
import {Spacing} from '@/utils/constants';
import {Colors} from '@/utils/colors';

interface IContestCard {
  item: any;
  showPrizeChartButton: boolean;
  navigation: any;
  width: any;
  showShare: any;
}

const ContestCard = ({item, navigation, width, showShare}: IContestCard) => {
  const {
    joined_list_count,
    total_competators,
    number_of_join_days_for_contest_extension,
    number_of_like_days_for_contest_extension,
    total_prize_money,
    entry_price,
    contest_ended,
    showPrizeChartButton,
    join_end_date,
    sample_image_url,
    like_end_date,
    is_canceled,
  } = item || {};
  let progress = 0;
  const joinEndDate = moment(join_end_date);
  const LikeEndDate = moment(like_end_date);
  const computeProgress = (joined_list_count / total_competators / 100) * 100;

  if (isNaN(computeProgress) || !computeProgress) {
    progress = 0;
  } else {
    progress = computeProgress;
  }

  return (
    <View
      className={
        !width ? 'shadow-info mr-4 shadow-md' : 'shadow-info shadow-md'
      }>
      <TouchableOpacity
        style={{width: width ? width : Dimensions.get('window').width / 1.2}}
        className={
          'bg-white my-2 pb-2 mt-2 rounded-lg overflow-hidden shadow-md shadow-black'
        }
        delayPressIn={0}
        activeOpacity={navigation !== null ? 0.5 : 1}
        onPress={() => navigation !== null && navigation(item)}>
        {showShare ? showShare : <></>}
        <JoinTag isLive={contest_ended} />
        <Image
          className="h-[250] w-full border-b-info border-b-1"
          resizeMode={'cover'}
          source={{
            uri: sample_image_url,
          }}
        />
        <View className="mt-3 px-3">
          <Text numberOfLines={1} className="text-lg font-sans-bold text-info">
            {item.concept_name.toUpperCase()}
          </Text>
          <View className="justify-between flex-row mt-2">
            <View>
              <Text className="text-center text-danger font-sans-bold">
                Prize Pool
              </Text>
              <Text className="text-info font-sans">₹ {total_prize_money}</Text>
            </View>
            {!is_canceled ? (
              <View style={{flexDirection: 'row'}}>
                <View>
                  <Text className=" text-[10px] text-info text-center">
                    JOIN ENDS IN
                  </Text>
                  <CountdownTimer
                    textStyle={{
                      color: Colors.danger,
                      ...Fonts.h3,
                      fontSize: fontSize.s2,
                    }}
                    targetDate={joinEndDate}
                  />
                </View>

                <View className="border-r-2 h-8 border-r-danger opacity-25 p-1 color" />
                <View style={{marginLeft: 8}}>
                  <Text className=" text-[10px] text-info text-center">
                    LIKE ENDS IN
                  </Text>
                  <CountdownTimer
                    textStyle={{
                      color: Colors.danger,
                      ...Fonts.h3,
                      fontSize: fontSize.s2,
                    }}
                    targetDate={LikeEndDate}
                  />
                </View>
              </View>
            ) : (
              <View className="jusify-center self-center">
                <Text className=" text-[10px] text-info text-center">
                  CONTEST CANCELLED
                </Text>
              </View>
            )}
            <View>
              <Text className="text-center text-danger font-sans-bold">
                Entry
              </Text>
              <Text className="text-info font-sans">₹ {entry_price}</Text>
            </View>
          </View>
          <View className="mt-2">
            <ProgressBar progress={progress} color={Colors.danger} />
            <View className="justify-between flex-row mt-2">
              <View className="flex-row">
                <Ionicons name="md-person" size={18} color={Colors.info} />
                <Text className="text-danger ml-2">
                  {total_competators - joined_list_count} spots left
                </Text>
              </View>
              <View className="flex-row">
                <Text className="text-info mr-2">
                  {total_competators} spots
                </Text>
                <Ionicons name="md-person" size={18} color={Colors.info} />
              </View>
            </View>
          </View>
        </View>

        {number_of_like_days_for_contest_extension !== 0 && (
          <Text className="px-2 text-info mt-2">
            Like Days Extended for{' '}
            <Text
              className="text-lg font-sans-bold"
              //    style={{...Fonts.h3, fontSize: fontSize.h5, color: Colors.info}}
            >
              {number_of_like_days_for_contest_extension} days
            </Text>
          </Text>
        )}

        {number_of_join_days_for_contest_extension !== 0 && (
          <Text className="px-2 text-info">
            Join Days Extended for{' '}
            <Text className="text-lg font-sans-bold">
              {number_of_join_days_for_contest_extension} days
            </Text>
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ContestCard;
