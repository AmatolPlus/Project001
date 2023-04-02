import {Colors} from '@/utils/colors';
import {Spacing} from '@/utils/constants';
import {Fonts} from '@/utils/fonts';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import Button from './Button';
import JoinEventConfirmModal from './JoinEventConfirmModal';
import Snackbar from './SnackBar';
import Text from './Text';

const DISABLE_JOIN = "You don't have minimum amount in the wallet";

const canJoinEvent = (
  days: number,
  occupancy: number,
  thresholdOccupancy: number,
) => {
  if (occupancy < thresholdOccupancy) {
    return true;
  }
  if (days <= 0) {
    return true;
  }
  return false;
};

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
        <Text style={styles.buttonText}>Withdraw</Text>
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

const styles = StyleSheet.create({
  button: {
    padding: Spacing.m,
  },
  buttonText: {
    ...Fonts.h3,
    color: Colors.white,
  },
});
