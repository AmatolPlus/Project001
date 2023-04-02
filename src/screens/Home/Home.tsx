import React from 'react';
import {FlatList, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useSectionQuery} from '@/services/apis/contests.api';
import {Button, Text} from '@/ui';
import {ScreenNames} from '@/utils/screenName';
import {styles} from './Home.styles';

export default function Home() {
  const navigation: any = useNavigation();
  const {data}: any = useSectionQuery({});

  let results = data?.results || [];

  console.log(data);

  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        renderItem={({item}) => {
          return (
            <View>
              <Button
                onPress={() =>
                  navigation.navigate(ScreenNames.details, {id: item.id})
                }>
                <Text>{item.concept_name}</Text>
              </Button>
            </View>
          );
        }}
      />
    </View>
  );
}
