import {Image, Text} from '@/ui';
import React, {memo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './Participants.styles';

const Participants = ({
  data,
  handleModalToggle,
  participants,
}: IParticipants) => {
  let Participants = data?.slice(0, 5);

  console.log(
    Participants.map((item: any) => {
      return item?.user;
    }),
  );

  const USER_IMAGE_PLACEHOLDER =
    'https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg';

  return (
    <TouchableOpacity onPress={handleModalToggle}>
      <View style={styles.container}>
        <Text onPress={handleModalToggle} style={styles.link}>
          Participants
        </Text>
        <View style={styles.listContainer}>
          {Participants.map((item: any, index): any => {
            return (
              <Image
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
          <Text>+ {participants - Participants?.length}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(Participants);
