/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {TouchableOpacity, View} from 'react-native';
import {ProgressBar} from 'react-native-paper';

import JoinTag from '../JoinTag/JoinTag';
import CountdownTimer from '../CountdownTImer/CountdownTImer';

import {Text, Image} from '@/ui';
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
    join_days_extended,
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
    <View style={styles.container}>
      <TouchableOpacity
        delayPressIn={0}
        activeOpacity={navigation !== null ? 0.5 : 1}
        onPress={() => navigation !== null && navigation(item)}
        style={{
          ...styles.imageContainer,
          marginHorizontal: !showPrizeChartButton ? Spacing.s : 0,
          width: width ? width : styles.imageContainer.width,
        }}>
        {showShare ? showShare : <></>}
        <JoinTag isLive={contest_ended} />
        <Image
          resizeMode={'cover'}
          style={styles.image}
          source={{
            uri: sample_image_url,
          }}
        />
        <View style={styles.infoContainer}>
          <Text numberOfLines={1} style={styles.name}>
            {item.concept_name.toUpperCase()}
          </Text>
          <View style={styles.contestInfoContainer}>
            <View>
              <Text style={styles.label}>Prize Pool</Text>
              <Text style={styles.price}>₹ {total_prize_money}</Text>
            </View>
            {!is_canceled ? (
              <View style={{flexDirection: 'row'}}>
                <View>
                  <Text
                    style={{
                      ...Fonts.sub2,
                      color: Colors.info,
                      textAlign: 'center',
                    }}>
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
                  <Text
                    style={{
                      ...Fonts.sub2,
                      color: Colors.info,
                      textAlign: 'center',
                    }}>
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
                <Text
                  style={{
                    ...Fonts.sub2,
                    color: Colors.danger,
                    textAlign: 'center',
                  }}>
                  CONTEST CANCELLED
                </Text>
              </View>
            )}

            <View>
              <Text style={styles.label}>Entry</Text>
              <Text style={styles.entryFee}>₹ {entry_price}</Text>
            </View>
          </View>
          <View style={styles.progressBarContainer}>
            <ProgressBar progress={progress} color={Colors.danger} />
            <View style={styles.contestInfoContainer}>
              <View className="flex-row">
                <Ionicons name="md-person" size={18} color={Colors.info} />
                <Text style={{color: Colors.danger, marginLeft: Spacing.xs}}>
                  {total_competators - joined_list_count} spots left
                </Text>
              </View>
              <View className="flex-row">
                <Text style={{color: Colors.info, marginRight: Spacing.xs}}>
                  {total_competators} spots
                </Text>
                <Ionicons name="md-person" size={18} color={Colors.info} />
              </View>
            </View>
          </View>
        </View>

        {number_of_join_days_for_contest_extension !== 0 && (
          <Text style={{paddingHorizontal: Spacing.l}}>
            Like Days Extended for{' '}
            <Text style={{...Fonts.h3, fontSize: fontSize.h5}}>
              {item?.join_days_extended} days
            </Text>
          </Text>
        )}

        {number_of_like_days_for_contest_extension !== 0 && (
          <Text style={{paddingHorizontal: Spacing.l}}>
            Join Days Extended for{' '}
            <Text style={{...Fonts.h3, fontSize: fontSize.h5}}>
              {join_days_extended} days
            </Text>
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ContestCard;
