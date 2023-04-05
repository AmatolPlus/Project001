import React, {useMemo, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {ProgressBar} from 'react-native-paper';

import {useContestDetailQuery} from '@/services/apis/contests.api';
import {Card, Image, ActivityIndicator, Text, Section, Button} from '@/ui';

import {Colors} from '@/utils/colors';
import {styles} from './Details.styles';
import Ticket from '@/ui/Ticket';
import {JoinEvent} from '@/ui/JoinEvent';
import PriceChart from '@/ui/PrizeChart';

export default function Details() {
  const {params}: any = useRoute();
  const id = params?.id;
  const [isPrizeChartShown, setPriceChartShown] = useState(false);
  const {data, isLoading}: any = useContestDetailQuery(id);

  const progress = useMemo(
    () => ((data?.joined_list_count / data?.total_competators) * 100) / 100,
    [data?.joined_list_count, data?.total_competators],
  );
  if (isLoading) {
    return <ActivityIndicator />;
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Image
          source={{
            uri: data.sample_image_url,
          }}
          style={styles.image}
        />
      </Card>
      <View style={styles.contestDetails}>
        <View style={styles.headerContainer}>
          <Section>
            <Text style={styles.title}>{data.concept_name}</Text>
          </Section>
          <Button
            buttonColor={Colors.info}
            style={styles.button}
            onPress={() => setPriceChartShown(!isPrizeChartShown)}>
            <Text style={styles.buttonText}>View Prize Chart</Text>
          </Button>
        </View>
        <Section>
          <Text style={styles.desc}>{data.contest_desc}</Text>
        </Section>
        <Section>
          <View style={styles.eventAttendees}>
            <Text style={styles.eventAttendeesText}>Event Attendees</Text>
            <Text style={styles.joinedCount}>
              {data?.joined_list_count + '/' + data?.total_competators}
            </Text>
          </View>
          <ProgressBar progress={progress} color={Colors.success} />
        </Section>
        <Section>
          <Text style={styles.eventDetailsHeader}>Event Details</Text>
          <Ticket
            contest_name={data.concept_name}
            ended_on={data.join_end_date}
            days={data.join_validity_in_days}
            created_on={data.published_on}
            entry_fee={data.entry_price}
          />
        </Section>

        <Section style={styles.termsHeaderContainer}>
          <Text style={styles.termsHeader}>
            Prizepool will depend on how many slots are filled
          </Text>
          <Text style={styles.termsBody}>
            I Confirm that i have read consent and agree to HighFive's user
            agreement & privacy policy. I am legal age & understand that i can
            change my communication preferences anytime in my account settings.
          </Text>
        </Section>
      </View>
      <JoinEvent
        thresholdOccupancy={data.total_competators}
        occupancy={data.joined_list_count}
        joinEndDate={data.join_end_date}
        joinStartDate={data.publish_on}
        threshold={0}
        onJoinEvent={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <PriceChart
        data={data.prize_chart}
        isOpen={isPrizeChartShown}
        setClosed={setPriceChartShown}
      />
    </ScrollView>
  );
}
