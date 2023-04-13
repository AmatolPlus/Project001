import {Image, Modal, Text} from '@/ui';
import React, {useCallback, useEffect, useState} from 'react';
import {Portal} from 'react-native-paper';
import {Pressable, SectionList, View} from 'react-native';
import {styles} from './TransactionModal.styles';
import moment from 'moment';
import {Colors} from '@/utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Spacing} from '@/utils/constants';
import {data} from '@/utils/mockData';

function formatHistory(data: []) {
  if (data) {
    let itemList = data.map(
      (obj: {
        history: any;
        date: string;
        to: string;
        items: object;
        id: string;
      }) => {
        let title = obj?.date;
        let id = obj.id;
        let items = obj.history;
        return {
          title,
          data: items,
          id,
        };
      },
    );
    return itemList.flat();
  } else {
    return null;
  }
}

const TransactionModal = () => {
  let [formattedData, setFormattedData] = useState([]);
  const [transactionModal, setTransactionModal] = useState(false);

  const handleToggleTransactionModal = useCallback(() => {
    setTransactionModal(!transactionModal);
  }, [transactionModal]);

  useEffect(() => {
    if (data) {
      let formattedList: any = formatHistory(data);
      setFormattedData(formattedList);
    }
  }, []);

  const renderHistory = ({item}: any) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardItemsContainer}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://th.bing.com/th/id/OIP.oUlyiyRbU_VvNL4FnW6lRgHaNJ?pid=ImgDet&w=608&h=1080&rs=1',
            }}
          />
          <View>
            <Text style={styles.to}>
              {item.transaction_type === 'credit'
                ? 'Credited By'
                : 'Transferred to'}{' '}
              {item.spent_on}
            </Text>
            <Text style={styles.transferredOn}>
              {moment(item.created_on).format('h:mm a, D MMMM YYYY')}
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              ...styles.amount,
              color:
                item.transaction_type === 'credit'
                  ? Colors.success
                  : Colors.danger,
            }}>
            {item.transaction_type === 'credit' ? '+' : '-'} ₹ {item.amount}
          </Text>
        </View>
      </View>
    );
  };

  const renderHeader = ({section: {title}}: any) => (
    <View>
      <View>
        <Text style={styles.date}>{title}</Text>
      </View>
    </View>
  );

  return (
    <View>
      <Pressable
        style={{marginTop: Spacing.m}}
        onPress={handleToggleTransactionModal}>
        <Text style={styles.link}>Transaction History</Text>
      </Pressable>
      <Portal>
        <Modal
          onDismiss={handleToggleTransactionModal}
          visible={transactionModal}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <Text style={styles.header}>Transaction History</Text>
              <AntDesign
                name="closecircleo"
                onPress={handleToggleTransactionModal}
                size={Spacing.xl}
                color={Colors.dark}
              />
            </View>

            <View style={styles.listContainer}>
              <SectionList
                showsVerticalScrollIndicator={false}
                renderSectionHeader={renderHeader}
                sections={formattedData}
                renderItem={renderHistory}
              />
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default TransactionModal;
