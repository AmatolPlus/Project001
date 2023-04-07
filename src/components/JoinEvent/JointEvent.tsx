import {Colors} from '@/utils/colors';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button, Text} from '@/ui';
import Snackbar from '@/ui/SnackBar';
import {canJoinEvent} from '@/utils/event';
import JoinEventConfirmModal from '@/ui/JoinEventConfirmModal';
import {styles} from './JoinEvent.styles';

const DISABLE_JOIN = "You don't have minimum amount in the wallet";
interface IJoinEvent {
  thresholdOccupancy: number;
  currentOccupancy: number;
  joinEndDate: string;
  joinStartDate: string;
  threshold: number;
  onJoinEvent: () => void;
}

export const JoinEvent = ({
  joinStartDate,
  joinEndDate,
  currentOccupancy,
  thresholdOccupancy,
  onJoinEvent,
}: IJoinEvent) => {
  const [isDisabled, setDisabled] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [showSnackbar, setSnackbar] = useState(false);

  const [joinDateExpired, setJoinDateExpired] = useState(false);

  useEffect(() => {
    let days = moment(joinStartDate).diff(joinEndDate, 'days');
    if (days < 0) {
      setJoinDateExpired(true);
    }
    setDisabled(canJoinEvent(days, currentOccupancy, thresholdOccupancy));
  }, [joinEndDate, joinStartDate, currentOccupancy, thresholdOccupancy]);

  const handleJoin = useCallback(() => {
    onJoinEvent();
  }, [onJoinEvent]);

  const handleToggleModal = useCallback(() => {
    if (isDisabled) {
      setSnackbar(true);
    } else {
      setOpen(!isOpen);
    }
  }, [isDisabled, isOpen]);

  return (
    <View style={styles.container}>
      {joinDateExpired ? (
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
          {backgroundColor: isDisabled ? Colors.grey : Colors.success},
        ]}>
        <Text style={styles.buttonText}>Join</Text>
      </Button>

      <JoinEventConfirmModal
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
