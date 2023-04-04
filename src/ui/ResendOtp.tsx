import React from 'react';
import Text from './Text';

export const ResendOtp = ({style, handleResend}: any) => {
  return (
    <Text style={style} onPress={() => handleResend()}>
      Resend OTP
    </Text>
  );
};
