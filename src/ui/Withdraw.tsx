import {Colors} from '@/utils/colors';
import {Fonts} from '@/utils/fonts';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, ToastAndroid} from 'react-native';
import Chip from './Chip';
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

  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      DISABLE_WITHDRAW,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  useEffect(() => {
    if (currentAmount < threshold || currentAmount === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [currentAmount, threshold]);

  const handleWidthdraw = useCallback(() => {
    if (isDisabled) {
      showToastWithGravityAndOffset();
    } else {
      onWithdraw();
    }
  }, [isDisabled, onWithdraw]);

  return (
    <>
      <Chip
        onPress={handleWidthdraw}
        style={[
          styles.button,
          {backgroundColor: isDisabled ? Colors.grey : Colors.success},
        ]}>
        <Text style={styles.buttonText}>Withdraw</Text>
      </Chip>
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
  button: {},
  buttonText: {
    ...Fonts.sub1,
    color: Colors.white,
  },
});
