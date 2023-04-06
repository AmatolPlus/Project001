import {Colors} from '@/utils/colors';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {styles} from './JoinEvent.styles';
import JoinEventConfirmModal from '@/ui/JoinEventConfirmModal';
import {Button, Text} from '@/ui';
import Snackbar from '@/ui/SnackBar';
import {canJoinEvent} from '@/utils/event';
const DISABLE_JOIN = "You don't have minimum amount in the wallet";

interface IJoinEvent {
  thresholdOccupancy: number;
  occupancy: number;
  joinEndDate: string;
  joinStartDate: string;
  threshold: number;
  onJoinEvent: () => void;
}

export const JoinEvent = ({
  joinStartDate,
  joinEndDate,
  occupancy,
  thresholdOccupancy,
  onJoinEvent,
}: IJoinEvent) => {
  const [isDisabled, setDisabled] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [showSnackbar, setSnackbar] = useState(false);
  let days = moment(joinStartDate).diff(joinEndDate, 'days');

  useEffect(() => {
    setDisabled(canJoinEvent(days, occupancy, thresholdOccupancy));
  }, [days, occupancy, thresholdOccupancy]);

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
    <>
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
    </>
  );
};
