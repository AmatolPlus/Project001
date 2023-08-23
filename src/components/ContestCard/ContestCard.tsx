import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text, Image} from '@/ui';
import {ProgressBar} from 'react-native-paper';
import JoinTag from '../JoinTag/JoinTag';
import {styles} from './ContestCard.styles';
import moment from 'moment';
import CountdownTimer from '../CountdownTImer/CountdownTImer';
import {Fonts, fontSize} from '@/utils/fonts';
import {Spacing} from '@/utils/constants';
import {Colors} from '@/utils/colors';

interface IContestCard {
  item: any;
  showPrizeChartButton: boolean;
  navigation: any;
  width: any;
}

export const ContestCard = ({item, navigation, width}: IContestCard) => {
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
  } = item || {};
  let progress = 0;
  const end_date = moment(join_end_date);
  const computeProgress = (joined_list_count / total_competators / 100) * 100;

  if (isNaN(computeProgress) || !computeProgress) {
    progress = 0;
  } else {
    progress = computeProgress;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={navigation !== null ? 0.5 : 1}
        onPress={() => navigation !== null && navigation(item)}
        style={{
          ...styles.imageContainer,
          marginHorizontal: !showPrizeChartButton ? Spacing.s : 0,
          width: width ? width : styles.imageContainer.width,
        }}>
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
            <View>
              <Text style={styles.label}>Ends in</Text>
              <CountdownTimer
                textStyle={{color: Colors.danger}}
                targetDate={end_date}
              />
            </View>
            <View>
              <Text style={styles.label}>Entry</Text>
              <Text style={styles.entryFee}>₹ {entry_price}</Text>
            </View>
          </View>
          <View style={styles.progressBarContainer}>
            <ProgressBar progress={progress} color={Colors.danger} />
            <View style={styles.contestInfoContainer}>
              <Text style={{color: Colors.danger}}>
                {total_competators - joined_list_count} spots left
              </Text>
              <Text style={{color: Colors.info}}>
                {total_competators} spots
              </Text>
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
