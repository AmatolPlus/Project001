import React from 'react';
import {ScrollView, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {ProgressBar} from 'react-native-paper';

import {useContestDetailQuery} from '@/services/apis/contests.api';
import {Card, Image, ActivityIndicator, Text, Section, Button} from '@/ui';

import {Colors} from '@/utils/colors';
import {Fonts, fontSize} from '@/utils/fonts';
import {styles} from './Details.styles';
import {BorderRadius, Spacing} from '@/utils/constants';
import Ticket from '@/ui/Ticket';

export default function Details() {
  const {params}: any = useRoute();
  const id = params?.id;
  const {data, isLoading}: any = useContestDetailQuery(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Card style={styles.card}>
        <Image
          source={{
            uri: 'https://th.bing.com/th/id/R.bcd2e89f150f5c917531770ae2aa7248?rik=%2bOmurtLsgdoVwg&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f05%2fImages-New-York-City-Wallpaper-HD.jpg&ehk=U1Mlv4RqYo8uyeVNc5Tj6eybKKPN5cdXtEvk7LSeB%2bc%3d&risl=&pid=ImgRaw&r=0',
          }}
          style={styles.image}
        />
      </Card>
      <View style={styles.contestDetails}>
        <View style={styles.headerContainer}>
          <Section title={'Contest Name'}>
            <Text style={styles.title}>{data.concept_name}</Text>
          </Section>
          <Section
            titleStyle={{color: Colors.white}}
            containerStyles={{
              backgroundColor: Colors.success,
            }}
            title={'View prize'}
          />
        </View>
        <Section title={'About Contest'}>
          <Text style={styles.desc}>{data.contest_desc}</Text>
        </Section>
        <Section title={'My Progress'}>
          <ProgressBar progress={0.5} color={Colors.primary} />
        </Section>
        <Section>
          <Text
            style={{
              ...Fonts.h1,
              fontSize: fontSize.h3,
              marginBottom: Spacing.l,
            }}>
            Event Details
          </Text>
          <Ticket
            contest_name={data.concept_name}
            ended_on={data.ends_on}
            days={data.days}
            created_on={data.created}
            entry_fee={data.entry_price}
          />
        </Section>

        <Section
          style={{
            padding: Spacing.s,
            borderRadius: BorderRadius.m,
            backgroundColor: Colors.warning,
          }}>
          <Text style={{...Fonts.h4, marginBottom: Spacing.s}}>
            Prizepool will depend on how many slots are filled
          </Text>
          <Text style={{...Fonts.sub1, color: Colors.dark}}>
            I Confirm that i have read consent and agree to HighFive's user
            agreement & privacy policy. I am legal age & understand that i can
            change my communication preferences anytime in my account settings.
          </Text>
        </Section>
      </View>
      <Button style={styles.joinButton}>
        <Text style={styles.joinButtonText}>Join</Text>
      </Button>
    </ScrollView>
  );
}
