import {Button, Divider, Image, Text} from '@/ui';
import React, {memo, useCallback} from 'react';
import {View} from 'react-native';
import moment from 'moment';

import {styles} from './OrderSummary.styles';
import {Colors} from '@/utils/colors';
import {IOrderSummary} from './OrderSummary.types';

const OrderSummary = ({
  onConfirm,
  contestName,
  imageId,
  image,
  entryFee,
  ends_on,
  mobile_number,
  started_on,
  wallet_amount,
  handleImageUploaded,
}: IOrderSummary) => {
  const handlePayment = useCallback(() => {
    onConfirm(imageId);
    handleImageUploaded();
  }, [handleImageUploaded, imageId, onConfirm]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: image}} />
        <View style={styles.buttonContainer}>
          <Text style={styles.info}>You have Selected this image</Text>
          <Text style={styles.changeButton}>Change</Text>
        </View>
      </View>
      <View>
        <Text style={styles.title}>Contest Details</Text>
        <Text style={styles.name}>{contestName.toUpperCase()}</Text>
        <Text style={styles.date}>
          Ends on {moment(ends_on).format('DD MMM YYYY')}
        </Text>
        <Text style={styles.date}>
          started on {moment(started_on).format('DD MMM YYYY')}
        </Text>
      </View>
      <Divider style={styles.divider} />
      <View>
        <Text style={styles.title}>Payment Details</Text>
        <View style={styles.entryFeeContainer}>
          <Text style={styles.entryFee}>Entryfee: </Text>
          <Text style={styles.entryFee}>₹ {entryFee}</Text>
        </View>
        <View style={styles.entryFeeContainer}>
          <Text style={styles.entryFee}>Wallet Amount: </Text>
          <Text
            style={{
              ...styles.entryFee,
              color: wallet_amount === 0 ? Colors.danger : Colors.success,
            }}>
            - ₹ {wallet_amount}
          </Text>
        </View>
        <View style={styles.entryFeeContainer}>
          <Text style={styles.entryFee}>Total Amount </Text>
          <Text style={styles.entryFee}>₹ {entryFee}</Text>
        </View>
      </View>
      <Divider style={styles.divider} />
      <View>
        <Text style={styles.title}>Contact Details</Text>
        <View style={styles.entryFeeContainer}>
          <Text style={styles.date}>Phone Number</Text>
          <Text style={styles.date}>{mobile_number}</Text>
        </View>
      </View>
      <Divider style={styles.divider} />
      <View>
        <Button onPress={handlePayment} style={styles.button}>
          <Text style={styles.buttonText}>{'Pay' + ' ₹' + entryFee}</Text>
        </Button>
      </View>
    </View>
  );
};

export default memo(OrderSummary);
