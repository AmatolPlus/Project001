import {useMoreContestsQuery} from '@/services/apis/contests.api';
import {ActivityIndicator, Card, Image, Text} from '@/ui';
import {ScreenNames} from '@/utils/screenName';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import React, {useCallback, useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './ContestLists.styles';

const COLUMN_COUNT = 2;

export default function ContestList() {
  const navigation: any = useNavigation();
  const {params} = useRoute();
  const {data, isLoading, isError} = useMoreContestsQuery(params?.id);
  const [lists, setList] = useState([]);

  useEffect(() => {
    if (data) {
      setList(data?.results);
    }
  }, [data]);

  const handleNavigation = useCallback(
    (item: {id: any}) => {
      navigation.navigate(ScreenNames.details, {id: item?.id});
    },
    [navigation],
  );

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isError) {
    return <></>;
  }

  const renderItem = ({item}: any) => {
    return (
      <Card style={styles.row}>
        <TouchableOpacity
          onPress={() => handleNavigation(item)}
          style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: item?.sample_image_url}} />
          <Text style={styles.title}>{item.concept_name}</Text>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <FlashList
        estimatedItemSize={100}
        numColumns={COLUMN_COUNT}
        data={lists}
        renderItem={renderItem}
      />
    </View>
  );
}
