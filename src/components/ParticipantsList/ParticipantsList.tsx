import React, {useCallback, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {View} from 'react-native';
import {Portal} from 'react-native-paper';
import {FlashList} from '@shopify/flash-list';

import Participants from '../Participants/Participants';

import {Modal, Text} from '@/ui';
import {Colors} from '@/utils/colors';
import {filteredList} from '@/utils/getFilteredList';
import {styles} from './ParticipantsList.styles';

import Card from '../Card/Card';

const ParticipantsList = ({data}: {data: any[]}) => {
  const [visible, setVisible] = useState(false);
  const filteredArray = filteredList(data);

  const handleModalToggle = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Participants List</Text>
        <AntDesign
          name="close"
          size={24}
          color={Colors.dark}
          onPress={handleModalToggle}
        />
      </View>
    );
  }, [handleModalToggle]);

  return (
    <View>
      <Participants
        participants={filteredArray.length}
        handleModalToggle={handleModalToggle}
        data={filteredArray}
      />
      <Portal>
        <Modal
          onDismiss={handleModalToggle}
          style={styles.modalContainer}
          visible={visible}>
          <View style={styles.modal}>
            <FlashList
              ListHeaderComponent={renderHeader}
              showsVerticalScrollIndicator={false}
              estimatedItemSize={100}
              renderItem={({item}: any) => {
                return <Card userName={item?.user?.first_name} item={item} />;
              }}
              data={filteredArray}
            />
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default ParticipantsList;
