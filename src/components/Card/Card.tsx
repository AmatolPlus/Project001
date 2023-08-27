import React from 'react';

import {View} from 'react-native';
import {styles} from './Card.styles';
import {Image, Text} from '@/ui';

const Card = ({item, type, userName}: any) => {
  const USER_IMAGE_PLACEHOLDER =
    'https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg';

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
          <Text style={styles.username}>
            {type !== 'prize' ? userName : item?.user?.mobile_number}
          </Text>
          <Text style={styles.rank}>Rank: {item?.rank}</Text>
          {type === 'prize' && (
            <Text style={styles.prize}>Prize Won: ₹{item?.prize_money}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default Card;
