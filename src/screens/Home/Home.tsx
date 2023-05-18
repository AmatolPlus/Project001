/* eslint-disable @typescript-eslint/no-shadow */

import React, {useCallback, useEffect, useState} from 'react';
import {SectionList, RefreshControl, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import {ActivityIndicator, Image, Text} from '@/ui';
import {ScreenNames} from '@/utils/screenName';
import {useSectionQuery} from '@/services/apis/contests.api';
import {TouchableOpacity} from 'react-native';
import {styles} from './Home.styles';
import formatArray from '@/utils/formatData';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import JoinTag from '@/components/JoinTag/JoinTag';
import MaxParticipantsTag from '@/components/MaxParticipantsTag/MaxParticipantsTag';
import {useBackHandler} from '@/hooks/useBackHandler';
import {useUserDetailsQuery} from '@/services/apis/login.api';
import PasswordCheck from '@/components/PasswordCheck/PasswordCheck';
import {useStoragePermission} from '@/hooks/getStoragePermission';
import TimerTag from '@/components/TimerTag/TimerTag';
import {fontSize} from '@/utils/fonts';

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
    const end_date = new Date(item?.join_end_date);
    return (
      <TouchableOpacity
        onPress={() => handleDetailNavigation(item)}
        style={styles.imageContainer}>
        <JoinTag isLive={item?.contest_ended} />
        <MaxParticipantsTag
          joined={item.joined_list_count}
          total={item.total_competators}
        />
        {!item.contest_ended && <TimerTag time={end_date} />}
        <Image
          resizeMode={'cover'}
          style={styles.image}
          source={{
            uri: item.sample_image_url,
          }}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.concept_name.toUpperCase()}</Text>
          <Text style={styles.price}>
            <Text style={styles.priceLabel}>ENTRY FEE :</Text> ₹
            {item.entry_price}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

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
              color="black"
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
