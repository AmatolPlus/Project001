import {Colors} from '@/utils/colors';
import {Spacing} from '@/utils/constants';
import {Fonts} from '@/utils/fonts';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import Button from './Button';
import Snackbar from './SnackBar';
import Text from './Text';

const DISABLE_WITHDRAW = "You don't have minimum amount in the wallet";

interface IWithdraw {
  currentAmount: number;
  threshold: number;
  onWithdraw: () => void;
}

export const Withdraw = ({currentAmount, threshold, onWithdraw}: IWithdraw) => {
  const [isDisabled, setDisabled] = useState(true);
  const [showSnackbar, setSnackbar] = useState(false);

  useEffect(() => {
    if (currentAmount < threshold) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [currentAmount, threshold]);

  const handleWidthdraw = useCallback(() => {
    if (isDisabled) {
      setSnackbar(true);
    } else {
      onWithdraw();
    }
  }, [isDisabled, onWithdraw]);

  return (
    <>
      <Button
        onPress={handleWidthdraw}
        style={[
          styles.button,
          {backgroundColor: isDisabled ? Colors.grey : Colors.success},
        ]}>
        <Text style={styles.buttonText}>Withdraw</Text>
      </Button>
      <Snackbar
        onDismiss={() => {
          setSnackbar(false);
        }}
        visible={showSnackbar}>
        {DISABLE_WITHDRAW}
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
