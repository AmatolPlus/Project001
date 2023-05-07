import {ScrollView, View} from 'react-native';
import React, {useCallback} from 'react';
import {IFinalPrice} from './FinalPrize.types';
import {styles} from './FinalPrize.styles';
import {Image, Text} from '@/ui';

const USER_IMAGE_PLACEHOLDER =
  'https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg';

export default function FinalPrize({data}: IFinalPrice) {
  const Card = useCallback(({item}: any) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Image
            style={styles.image}
            source={{
              uri: item?.user?.profile_image_url || USER_IMAGE_PLACEHOLDER,
            }}
          />
          <View style={styles.info}>
            <Text style={styles.username}>{item?.user?.mobile_number}</Text>
            <Text style={styles.rank}>Rank: {item?.rank}</Text>
            <Text style={styles.prize}>Prize Won: ₹{item?.prize_money}</Text>
          </View>
        </View>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Final Prize</Text>
      <ScrollView nestedScrollEnabled>
        {data?.map((item: any) => (
          <Card item={item} />
        ))}
      </ScrollView>
    </View>
  );
}
