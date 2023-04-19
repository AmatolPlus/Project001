import React, {useCallback, useState} from 'react';
import {View} from 'react-native';

import {Image, Modal, Text} from '@/ui';
import {styles} from './ParticipantsList.styles';
import {Portal} from 'react-native-paper';
import {getFullName} from '@/utils/getFullName';
import {FlashList} from '@shopify/flash-list';

const USER_IMAGE_PLACEHOLDER =
  'https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg';

const ParticipantsList = ({participants, data}: any) => {
  const [visible, setVisible] = useState(false);

  const handleModal = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const renderItem = useCallback(({item}: any) => {
    let name = getFullName(item?.user?.first_name, item?.user?.last_name);
    return (
      <View style={styles.listContainer}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            style={styles.userImage}
            source={{
              uri: item?.user?.profile_image_url || USER_IMAGE_PLACEHOLDER,
            }}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.rank}>RANK: {item?.rank}</Text>
          </View>
        </View>
      </View>
    );
  }, []);

  const renderHeader = useCallback(() => {
    return <Text style={styles.header}>{'Participants List'}</Text>;
  }, []);

  return (
    <View>
      <Text onPress={handleModal} style={styles.participantText}>
        View Participants ({participants})
      </Text>
      <Portal>
        <Modal
          onDismiss={handleModal}
          style={styles.modalContainer}
          visible={visible}>
          <View style={styles.modal}>
            <FlashList
              ListHeaderComponent={renderHeader}
              showsVerticalScrollIndicator={false}
              estimatedItemSize={100}
              renderItem={renderItem}
              data={data}
            />
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default ParticipantsList;
