import React, {useCallback, useMemo, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text, Image, Button} from '@/ui';
import {ProgressBar} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import JoinTag from '../JoinTag/JoinTag';
import {styles} from './ContestCard.styles';
import moment from 'moment';
import CountdownTimer from '../CountdownTImer/CountdownTImer';
import PriceChart from '@/ui/PrizeChart';
import {Fonts, fontSize} from '@/utils/fonts';
import {Spacing} from '@/utils/constants';

interface IContestCard {
  item: any;
  showPrizeChartButton: boolean;
  navigation: any;
  width: any;
}

export const ContestCard = ({
  item,
  showPrizeChartButton,
  navigation,
  width,
}: IContestCard) => {
  const [isPrizeChartShown, setPriceChartShown]: [any, any] = useState(false);

  const handlePrizeChartToggle = useCallback(() => {
    setPriceChartShown(!isPrizeChartShown);
  }, [isPrizeChartShown]);

  const progress = useMemo(() => {
    ((item?.joined_list_count / item?.total_competators) * 100) / 100;
  }, [item?.joined_list_count, item?.total_competators]);

  const end_date = moment(item?.join_end_date);
  return (
    <TouchableOpacity
      activeOpacity={navigation !== null ? 0.5 : 1}
      onPress={() => navigation !== null && navigation(item)}
      style={{
        ...styles.imageContainer,
        width: width ? width : styles.imageContainer.width,
      }}>
      <JoinTag isLive={item?.contest_ended} />
      <Image
        resizeMode={'cover'}
        style={styles.image}
        source={{
          uri: item?.sample_image_url,
        }}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.concept_name.toUpperCase()}</Text>
        <View style={styles.contestInfoContainer}>
          <View>
            <Text style={styles.label}>Prize Pool</Text>
            <Text style={styles.price}>₹ {item?.total_prize_money}</Text>
          </View>
          <View>
            <Text style={styles.label}>Ends in</Text>
            <CountdownTimer targetDate={end_date} />
          </View>
          <View>
            <Text style={styles.label}>Entry</Text>
            <Text style={styles.entryFee}>₹ {item?.entry_price}</Text>
          </View>
        </View>
        <View style={styles.progressBarContainer}>
          <ProgressBar progress={progress} color={Colors.success} />
          <View style={styles.contestInfoContainer}>
            <Text>
              {item?.total_competators - item?.joined_list_count} spots left
            </Text>
            <Text>{item?.total_competators} spots</Text>
          </View>
        </View>
        {showPrizeChartButton && (
          <Button onPress={handlePrizeChartToggle}>
            <Text style={styles.buttonText}>View Prize Chart</Text>
          </Button>
        )}
      </View>
      {item?.number_of_join_days_for_contest_extension !== 0 && (
        <Text style={{paddingHorizontal: Spacing.l}}>
          Like Days Extended for{' '}
          <Text style={{...Fonts.h3, fontSize: fontSize.h5}}>
            {item?.join_days_extended} days
          </Text>
        </Text>
      )}

      {item?.number_of_like_days_for_contest_extension !== 0 && (
        <Text style={{paddingHorizontal: Spacing.l}}>
          Join Days Extended for{' '}
          <Text style={{...Fonts.h3, fontSize: fontSize.h5}}>
            {item?.join_days_extended} days
          </Text>
        </Text>
      )}

      {!item?.is_canceled && (
        <PriceChart
          notes={item?.notes}
          members={item?.total_competators}
          data={item?.prize_chart}
          isOpen={isPrizeChartShown}
          setClosed={setPriceChartShown}
        />
      )}
    </TouchableOpacity>
  );
};
