import {View, Text} from 'react-native';
import React from 'react';
import moment from 'moment';

import {Colors} from '@/utils/colors';
import {styles} from './LikeExpiry.styles';
import {canLikeEvent} from '@/utils/event';

export default function LikeExpiry({like_end_date}: any) {
  const canLike = canLikeEvent(like_end_date);
  console.log(like_end_date);
  return (
    <View
      style={[
        styles.note,
        {
          opacity: canLike ? 1 : 0.6,
        },
      ]}>
      <View style={styles.noteTextContainer}>
        <Text style={{color: Colors.dark2}}>
          Like date for the contest {canLike ? 'ends' : 'ended'} on&nbsp;
          <Text style={styles.noteDate}>
            {moment(like_end_date).format('DD MMM YYYY')}
          </Text>
        </Text>
      </View>
    </View>
  );
}
