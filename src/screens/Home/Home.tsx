/* eslint-disable @typescript-eslint/no-shadow */

import React, {useCallback, useEffect, useState} from 'react';
import {SectionList, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import {ActivityIndicator, Image, Text} from '@/ui';
import {ScreenNames} from '@/utils/screenName';
import {styles} from './Home.styles';
import {useSectionQuery} from '@/services/apis/contests.api';
import formatArray from '@/utils/formatData';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {TouchableOpacity} from 'react-native';

export default function Home() {
  const navigation: any = useNavigation();
  const [formattedData, setFormattedData] = useState([]);
  const {data, isError, isLoading}: any = useSectionQuery({});

  useEffect(() => {
    if (data) {
      let formattedList: any = formatArray(data);
      setFormattedData(formattedList);
    }
  }, [data]);

  const handleDetailNavigation = useCallback(
    ({id}: any) => {
      navigation.navigate(ScreenNames.details, {id});
    },
    [navigation],
  );

  if (isError) {
    return <></>;
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const renderHeader = ({section: {title, data, id}}: any) => (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.header}>{title}</Text>
        <SimpleLineIcons
          onPress={() => navigation.navigate(ScreenNames.contestList, {id})}
          name="arrow-right"
          size={20}
          color="black"
        />
      </View>
      <FlashList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={100}
        contentContainerStyle={styles.listContainer}
        renderItem={({item}: any) => (
          <TouchableOpacity
            onPress={() => handleDetailNavigation(item)}
            style={styles.imageContainer}>
            <Image
              resizeMode={'cover'}
              style={styles.image}
              source={{
                uri: item.sample_image_url,
              }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={formattedData}
        keyExtractor={(item, index) => item + index}
        renderItem={({}) => <></>}
        renderSectionHeader={renderHeader}
      />
    </View>
  );
}
