/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */

import React, {useCallback, useEffect, useState} from 'react';
import {SectionList, RefreshControl, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import {ActivityIndicator, Text} from '@/ui';
import {ScreenNames} from '@/utils/screenName';
import {useSectionQuery} from '@/services/apis/contests.api';
import {styles} from './Home.styles';
import formatArray from '@/utils/formatData';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useBackHandler} from '@/hooks/useBackHandler';
import {useUserDetailsQuery} from '@/services/apis/login.api';
import PasswordCheck from '@/components/PasswordCheck/PasswordCheck';
import {useStoragePermission} from '@/hooks/getStoragePermission';
import {fontSize} from '@/utils/fonts';
import {ContestCard} from '@/components/ContestCard/ContestCard';
import {Spacing} from '@/utils/constants';
import {Colors} from '@/utils/colors';

function Home() {
  const navigation: any = useNavigation();
  const [formattedData, setFormattedData] = useState([]);
  const {data, isError, refetch, isLoading}: any = useSectionQuery({});
  const {data: user}: any = useUserDetailsQuery({});

  useBackHandler();
  useStoragePermission();

  useEffect(() => {
    if (data) {
      let formattedList: any = formatArray(data);
      setFormattedData(formattedList);
    }
  }, [data]);

  const handleDetailNavigation = useCallback(
    ({id, concept_name}: any) => {
      navigation.navigate(ScreenNames.details, {id, concept_name});
    },
    [navigation],
  );

  const handleContestNavigation = useCallback(
    ({id}: any) => {
      navigation.navigate(ScreenNames.contestList, {id});
    },
    [navigation],
  );

  if (isError) {
    return <></>;
  }

  if (isLoading) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <ActivityIndicator />
      </View>
    );
  }

  const renderItem = ({item}: any) => {
    return (
      <ContestCard
        showPrizeChartButton={false}
        item={item}
        navigation={handleDetailNavigation}
        width={undefined}
      />
    );
  };

  // 5 to 25 chars // profile_id @ . + - _

  const renderHeader = ({section: {title, data, id}}: any) =>
    data.length ? (
      <View>
        <View style={styles.sectionHeader}>
          <Text style={styles.header}>{title}</Text>
          {data.length > 5 ? (
            <SimpleLineIcons
              onPress={() => handleContestNavigation(id)}
              name="arrow-right"
              size={fontSize.h6}
              color={Colors.info}
            />
          ) : (
            <></>
          )}
        </View>
        <FlashList
          keyExtractor={(item: any) => item?.id?.toString()}
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={100}
          contentContainerStyle={styles.listContainer}
          renderItem={renderItem}
        />
      </View>
    ) : (
      <></>
    );

  return (
    <View style={styles.container}>
      {!user?.password_configured && <PasswordCheck />}
      <SectionList
        refreshControl={
          <RefreshControl onRefresh={refetch} refreshing={false} />
        }
        sections={formattedData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item + index}
        renderItem={({}) => <></>}
        renderSectionHeader={renderHeader}
      />
    </View>
  );
}

export default Home;
