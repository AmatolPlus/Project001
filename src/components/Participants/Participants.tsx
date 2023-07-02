import {Image, Text} from '@/ui';
import React, {memo} from 'react';
import {TouchableOpacity, View} from 'react-native';

import {styles} from './Participants.styles';
import {IParticipants} from './Participants.types';

const Participants = ({
  data,
  handleModalToggle,
  participants,
}: IParticipants) => {
  let slicedParticipants = data?.slice(0, 4);

  const USER_IMAGE_PLACEHOLDER =
    'https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg';

  return (
    <TouchableOpacity onPress={handleModalToggle}>
      <View style={styles.container}>
        <Text onPress={handleModalToggle} style={styles.link}>
          Participants
        </Text>
        <View style={styles.listContainer}>
          {slicedParticipants.map((item: any, index: number): any => {
            return (
              <Image
                key={item?.user?.profile_image_url}
                source={{
                  uri: item?.user?.profile_image_url || USER_IMAGE_PLACEHOLDER,
                }}
                style={{
                  ...styles.image,
                  marginLeft: index > 0 ? -15 : 0,
                }}
              />
            );
          })}
          {participants - Participants?.length !== 0 && (
            <Text>+ {participants - Participants?.length}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(Participants);
