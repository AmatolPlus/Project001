import {ActivityIndicator, Image, Modal, Text} from '@/ui';
import React, {useCallback, useEffect, useState} from 'react';
import {Portal} from 'react-native-paper';
import {Pressable, SectionList, View} from 'react-native';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {styles} from './TransactionModal.styles';
import {Colors} from '@/utils/colors';
import {Spacing} from '@/utils/constants';
import {useWalletTransactionsQuery} from '@/services/apis/wallet.api';
import {RefreshControl} from 'react-native';

function formatHistory(history: any) {
  if (history) {
    let itemList = history?.results.map(
      (obj: {created: any; to: string; items: object}) => {
        let title = obj?.created;
        let items = obj;
        return {
          title: moment(title).format('dddd'),
          data: [items],
        };
      },
    );
    return itemList.flat();
  } else {
    return null;
  }
}

const TransactionModal = () => {
  const [page, setPage] = useState(1);
  let {data, refetch, isLoading} = useWalletTransactionsQuery(page);
  let [formattedData, setFormattedData] = useState([]);
  const [transactionModal, setTransactionModal] = useState(false);

  const pageInfo = data?.current || '<Page 1 of 2>';
  const currentPage = parseInt(pageInfo.split(' ')[1], 10);
  const maxPages = parseInt(pageInfo.split(' ')[3].slice(0, -1), 10);

  const handleChangePage = useCallback(
    (action: 'next' | 'previous') => {
      setPage(action === 'next' ? page + 1 : page - 1);
    },
    [page],
  );

  const handleToggleTransactionModal = useCallback(() => {
    setTransactionModal(!transactionModal);
  }, [transactionModal]);

  useEffect(() => {
    let formattedList: any = formatHistory(data);
    setFormattedData(formattedList);
  }, [data]);

  const renderFooter = useCallback(() => {
    return (
      <View style={styles.buttonContainer}>
        {maxPages !== currentPage && (
          <Text style={styles.button} onPress={() => handleChangePage('next')}>
            Next
          </Text>
        )}
        {page !== 1 && (
          <Text
            style={styles.button}
            onPress={() => handleChangePage('previous')}>
            Previous
          </Text>
        )}
      </View>
    );
  }, [currentPage, handleChangePage, maxPages, page]);

  const renderHistory = ({item}: any) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardItemsContainer}>
          <View>
            <Text style={styles.to}>{item.remarks}</Text>
            <Text style={styles.transferredOn}>
              {moment(item.created_on).format('h:mm a, D MMMM YYYY')}
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              ...styles.amount,
              color: item.status === 'credit' ? Colors.success : Colors.danger,
            }}>
            {item.status === 'credit' ? '+' : '-'} ₹ {item.amount}
          </Text>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  // const renderHeader = ({section: {title}}: any) => (
  //   <View>
  //     <View>
  //       <Text style={styles.date}>{title}</Text>
  //     </View>
  //   </View>
  // );

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
                refreshControl={
                  <RefreshControl onRefresh={refetch} refreshing={isLoading} />
                }
                ListFooterComponent={renderFooter}
                showsVerticalScrollIndicator={false}
                renderSectionHeader={() => <></>}
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
