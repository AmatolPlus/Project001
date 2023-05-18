import {ActivityIndicator, Text} from '@/ui';
import React, {useCallback, useEffect, useState} from 'react';
import {SectionList, View} from 'react-native';
import moment from 'moment';

import {styles} from './Transactions.styles';
import {Colors} from '@/utils/colors';
import {useWalletTransactionsQuery} from '@/services/apis/wallet.api';
import {RefreshControl} from 'react-native';
import {FlashList} from '@shopify/flash-list';

function formatHistory(history: any) {
  if (history) {
    let itemList = history?.results.map(
      (obj: {
        remarks: any;
        amount: any;
        created: any;
        to: string;
        items: object;
      }) => {
        let title = obj?.created;
        let amount = obj?.amount;
        let remarks = obj?.remarks;

        let items = obj;
        return {
          title: moment(title).format('dddd'),
          data: [items],
          amount,
          remarks,
        };
      },
    );
    return itemList.flat();
  } else {
    return null;
  }
}

const Transactions = () => {
  const [page, setPage] = useState(1);
  let {data, refetch, isLoading} = useWalletTransactionsQuery(page);
  let [formattedData, setFormattedData] = useState([]);

  const pageInfo = data?.current || '<Page 1 of 2>';
  const currentPage = parseInt(pageInfo.split(' ')[1], 10);
  const maxPages = parseInt(pageInfo.split(' ')[3].slice(0, -1), 10);

  const handleChangePage = useCallback(
    (action: 'next' | 'previous') => {
      setPage(action === 'next' ? page + 1 : page - 1);
    },
    [page],
  );

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

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Transaction History</Text>
        </View>
        <View style={styles.listContainer}>
          <FlashList
            refreshControl={
              <RefreshControl onRefresh={refetch} refreshing={isLoading} />
            }
            ListFooterComponent={renderFooter}
            showsVerticalScrollIndicator={false}
            data={formattedData}
            renderItem={renderHistory}
          />
        </View>
      </View>
    </View>
  );
};

export default Transactions;
