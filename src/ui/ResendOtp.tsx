import React, {useCallback} from 'react';
import Text from './Text';

export const ResendOtp = ({style, handleResend}: any) => {
  const ResendOTP = useCallback(() => {
    handleResend();
  }, [handleResend]);

  return (
    <Text style={style} onPress={() => ResendOTP()}>
      Resend OTP
    </Text>
  );
};
