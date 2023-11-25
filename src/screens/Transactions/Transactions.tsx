/// <reference types="nativewind/types" />

import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  RefreshControl,
  Text,
  // ToastAndroid
} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import moment from 'moment';

import {ActivityIndicator, Button, Image} from '@/ui';
import {Colors} from '@/utils/colors';
import {
  // useGetCreditMutation,
  useWalletAmountQuery,
  useWalletTransactionsQuery,
} from '@/services/apis/wallet.api';
import {styles} from './Transactions.styles';
import {useUserDetailsQuery} from '@/services/apis/login.api';
import {Fonts} from '@/utils/fonts';
import {Spacing} from '@/utils/constants';

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

const USER_IMAGE_PLACEHOLDER =
  'https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg';

const Transactions = () => {
  const [page, setPage] = useState(1);
  const {
    data: wallet,
    isLoading: walletLoading,
    refetch: walletRefresh,
  } = useWalletAmountQuery({});
  // const [getCredits] = useGetCreditMutation({});
  let {data, refetch, isLoading} = useWalletTransactionsQuery(page);
  let [formattedData, setFormattedData] = useState([]);
  const {data: user} = useUserDetailsQuery({});

  const pageInfo = data?.current || '<Page 1 of 2>';
  const currentPage = parseInt(pageInfo.split(' ')[1], 10);
  const maxPages = parseInt(pageInfo.split(' ')[3].slice(0, -1), 10);

  // const handleGetCredit = useCallback(async () => {
  //   try {
  //     let credit_data: any = await getCredits({});
  //     if (credit_data?.data?.detail) {
  //       return ToastAndroid.show(credit_data?.data?.detail, ToastAndroid.LONG);
  //     } else {
  //       return ToastAndroid.show(
  //         credit_data?.error?.data?.detail,
  //         ToastAndroid.LONG,
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [getCredits]);

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
              {moment(item?.data[0]?.created).format('h:mm a, D MMMM YYYY')}
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              ...styles.amount,
              color:
                item?.data[0]?.status === 'CREDIT'
                  ? Colors.info
                  : Colors.danger,
            }}>
            {item?.data[0]?.status === 'CREDIT' ? '+' : '-'} ₹ {item.amount}
          </Text>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View className="bg-primary flex-1 p-12">
      <View className="flex-row justify-between" style={{alignItems: 'center'}}>
        <Image
          className="h-28 rounded-full mr-4 shadow-xl shadow-info w-28"
          resizeMode="cover"
          source={{uri: user?.profile_image_url || USER_IMAGE_PLACEHOLDER}}
        />
        <View className="">
          <Text className="text-xl font-sans-bold color-info">
            Wallet Balance
          </Text>
          <Text className="text-xl font-sans-bold color-info">
            ₹ {wallet?.earned_amount === null ? '0' : wallet?.earned_amount}
          </Text>
          <View className="justify-end">
            <Button
              className="mt-2 mb-2"
              style={{alignSelf: 'flex-end', ...Fonts.h4}}
              textColor={Colors.info}
              onPress={walletRefresh}
              loading={walletLoading}>
              <Text className="font-sans">Refresh Balance</Text>
            </Button>
          </View>
          {/* <Text
            onPress={handleGetCredit}
            className="p-2 text-center color-white rounded-md bg-danger">
            Get Credits
          </Text> */}
        </View>
      </View>
      {/* <View className="h-48 justify-center w-full bg-white mt-12 rounded-md">
        <Text className="text-center color-info font-sans-bold text-2xl ">
          Overview
        </Text>
        <Text className="color-emerald-400 font-sans-bold text-xl text-center mt-8">
          Winnings
        </Text>
        <Text className="color-emerald-400 text-lg  text-center mt-2">5</Text>
        <Text className="color-emerald-400 font-sans text-sm text-center mt-0">
          competition
        </Text>
      </View> */}
      {formattedData?.length !== 0 ? (
        <FlashList
          style={{marginTop: Spacing.xl}}
          refreshControl={
            <RefreshControl onRefresh={refetch} refreshing={isLoading} />
          }
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          data={formattedData}
          renderItem={renderHistory}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text className="text-info font-sans">No Transactions Made</Text>
        </View>
      )}
    </View>
  );
};

export default Transactions;
