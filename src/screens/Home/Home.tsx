import {useContestListQuery} from '@/services/apis/contests.api';
import {Button, Text} from '@/ui';
import {ScreenNames} from '@/utils/screenName';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {styles} from './Home.styles';

export default function Home() {
  const navigation: any = useNavigation();
  const {data, isError, isLoading}: any = useContestListQuery({});

  useEffect(() => {
    console.log(JSON.stringify(data), isError);
  }, [data, isError]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Button
        style={styles.button}
        onPress={() => navigation.navigate(ScreenNames.details)}>
        <Text style={styles.buttonText}>DetailsScreen</Text>
      </Button>
    </View>
  );
}
