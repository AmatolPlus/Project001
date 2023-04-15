import {Colors} from '@/utils/colors';
import moment from 'moment';
import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button, Text} from '@/ui';
import Snackbar from '@/ui/SnackBar';
import {canJoinEvent} from '@/utils/event';
import JoinEventConfirmModal from '@/ui/JoinEventConfirmModal';
import {styles} from './JoinEvent.styles';
import {IJoinEvent} from './JoinEvent.types';
import {useWalletAmountQuery} from '@/services/apis/wallet.api';

const DISABLE_JOIN = 'Joining period for this event has ended';

export const JoinEvent = ({
  joinStartDate,
  contestName,
  entryFee,
  joinEndDate,
  currentOccupancy,
  thresholdOccupancy,
  onJoinEvent,
}: IJoinEvent) => {
  const [isOpen, setOpen] = useState(false);
  const [showSnackbar, setSnackbar] = useState(false);
  const days = moment(joinStartDate).diff(joinEndDate, 'days');
  const canJoin = canJoinEvent(days, currentOccupancy, thresholdOccupancy);
  const {data: wallet} = useWalletAmountQuery({});

  const handleJoin = useCallback(() => {
    onJoinEvent();
  }, [onJoinEvent]);

  const handleToggleModal = useCallback(() => {
    if (!canJoin) {
      setSnackbar(true);
    } else {
      setOpen(!isOpen);
    }
  }, [canJoin, isOpen]);

  return (
    <View style={styles.container}>
      {!canJoin ? (
        <View style={styles.iconContainer}>
          <AntDesign name="infocirlceo" size={18} color={Colors.danger} />
          <Text style={styles.deadlineAlert}>
            The join deadline for this event is over.
          </Text>
        </View>
      ) : (
        <></>
      )}
      <Button
        onPress={handleToggleModal}
        style={[
          styles.button,
          {backgroundColor: !canJoin ? Colors.grey : Colors.success},
        ]}>
        <Text style={styles.buttonText}>Join</Text>
      </Button>

      <JoinEventConfirmModal
        contestName={contestName}
        wallet={wallet?.earned_amount}
        entryFee={entryFee}
        isOpen={isOpen}
        onClose={handleToggleModal}
        onConfirm={handleJoin}
      />
      <Snackbar
        onDismiss={() => {
          setSnackbar(false);
        }}
        visible={showSnackbar}>
        {DISABLE_JOIN}
      </Snackbar>
    </View>
  );
};
