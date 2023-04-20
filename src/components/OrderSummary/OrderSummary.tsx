import {Button, Divider, Image, Text} from '@/ui';
import React, {memo} from 'react';
import {View} from 'react-native';
import {styles} from './OrderSummary.styles';
import {Colors} from '@/utils/colors';
import {height} from '@/utils/Dimension';

const OrderSummary = ({
  onConfirm,
  contestName,
  imageUrl,
  entryFee,
  wallet_amount,
  onClose,
}: IOrderSummary) => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{uri: imageUrl}}
          style={{height: 20, width: 20, borderRadius: 100}}
        />
        <View>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{contestName.toUpperCase()}</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.entryFeeContainer}>
            <Text style={styles.info}>ENTRY FEE :</Text>
            <Text style={styles.entryFee}>₹ {entryFee}</Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.entryFeeContainer}>
            <Text style={styles.info}>My Wallet Balance Amount :</Text>
            <Text style={styles.wallet}>₹ {wallet_amount}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          buttonColor={Colors.success}
          onPress={onConfirm}>
          <Text style={styles.buttonText}>Confirm</Text>
        </Button>
        <Button
          style={styles.button}
          buttonColor={Colors.danger}
          onPress={onClose}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Button>
      </View>
    </View>
  );
};

export default memo(OrderSummary);
