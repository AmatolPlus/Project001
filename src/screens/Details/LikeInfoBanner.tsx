import React from 'react';
import {View} from 'react-native';
import moment from 'moment';

import {Text} from '@/ui';
import {Colors} from '@/utils/colors';
import {styles} from './Details.styles';

import LikeExpiry from '@/components/LikeExpiry/LikeExpiry';
import TermsAndConditionsModal from '@/components/TermsAndConditions/TermsAndConditions';

export const ContestInfoBanner = ({
  is_cancelled,
  join_end_date,
  is_joined_by_me,
  canJoin,
  tnc,
  like_end_date,
}: any) => (
  <View className="flex-row items-center rounded-lg p-1">
    {!is_cancelled && (
      <View className="flex-row bg-white rounded-md">
        <View className="w-2/4">
          <View
            style={[
              styles.note,
              {
                opacity: canJoin || !is_joined_by_me ? 1 : 0.5,
              },
            ]}>
            <View style={styles.noteTextContainer}>
              <Text style={{color: Colors.info}}>
                Join {canJoin ? 'before' : 'ended'} on&nbsp;
                <Text style={styles.noteDate}>
                  {moment(join_end_date).format('DD MMM YYYY')}
                </Text>
              </Text>
            </View>
          </View>
          <View className="m-3">
            <TermsAndConditionsModal message={tnc} />
          </View>
        </View>
        <View className="items-center w-2/4">
          <View>
            <LikeExpiry like_end_date={like_end_date} />
          </View>
        </View>
      </View>
    )}
  </View>
);
