import React, {useCallback, useState} from 'react';
import {ToastAndroid, View} from 'react-native';

import {useWalletAmountQuery} from '@/services/apis/wallet.api';

import JoinEventConfirmModal from '@/ui/JoinEventConfirmModal';

import {Button, Text} from '@/ui';
import {canJoinEvent} from '@/utils/event';
import {styles} from './JoinEvent.styles';
import {IJoinEvent} from './JoinEvent.types';
import {Colors} from '@/utils/colors';

const DISABLE_JOIN = 'Joining period for this event has ended';

export const JoinEvent = ({
  contestName,
  entryFee,
  joinEndDate,
  started_on,
  mobile_number,
  currentOccupancy,
  thresholdOccupancy,
  is_free,
  onJoinEvent,
}: IJoinEvent) => {
  const [isOpen, setOpen] = useState(false);
  const canJoin = canJoinEvent(
    joinEndDate,
    currentOccupancy,
    thresholdOccupancy,
  );
  const {data: wallet} = useWalletAmountQuery({});

  const handleToggleModal = useCallback(() => {
    if (!canJoin) {
      ToastAndroid.show(DISABLE_JOIN, ToastAndroid.LONG);
    } else {
      setOpen(!isOpen);
    }
  }, [canJoin, isOpen]);

  const handleJoin = useCallback(
    (image: any) => {
      onJoinEvent(image);
      handleToggleModal();
    },
    [handleToggleModal, onJoinEvent],
  );

  return (
    <View style={styles.container}>
      <Button
        onPress={handleToggleModal}
        style={[
          styles.button,
          {backgroundColor: !canJoin ? Colors.grey : Colors.danger},
        ]}>
        <Text style={styles.buttonText}>Join</Text>
      </Button>

      <JoinEventConfirmModal
        started_on={started_on}
        ends_on={joinEndDate}
        mobile_number={mobile_number}
        contestName={contestName}
        wallet={wallet?.earned_amount}
        entryFee={entryFee}
        isOpen={isOpen}
        is_free={is_free}
        onClose={handleToggleModal}
        onConfirm={handleJoin}
      />
    </View>
  );
};
