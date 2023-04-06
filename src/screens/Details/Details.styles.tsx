import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {VerticalMargin} from '@/utils/spacing';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: Spacing.l,
    paddingBottom: Spacing.l,
    backgroundColor: Colors.white,
  },
  text: {
    ...Fonts.h1,
    fontSize: fontSize.h4,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    height: 200,
    borderRadius: Spacing.m,
  },
  image: {
    width: '100%',
    borderRadius: Spacing.m,
    height: '100%',
  },
  contestDetails: {
    marginTop: Spacing.m,
  },
  label: {
    color: Colors.dark,
    ...Fonts.sub1,
  },
  labelContainer: {
    backgroundColor: Colors.light,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    padding: Spacing.xs,
    borderRadius: BorderRadius.xs,
  },
  title: {
    ...Fonts.h2,
    ...VerticalMargin('xs'),
  },
  desc: {
    ...Fonts.h5,
    fontSize: fontSize.h4,
    ...VerticalMargin('xs'),
  },
  knowMore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.info,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: Spacing.s,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  joinButton: {
    backgroundColor: Colors.success,
    padding: Spacing.m,
  },
  joinButtonText: {
    ...Fonts.h4,
    color: Colors.white,
    marginBottom: Spacing.m,
  },
  button: {position: 'absolute', borderRadius: BorderRadius.s, right: 0},
  buttonText: {...Fonts.h3, fontSize: fontSize.s1, color: Colors.white},
  eventAttendees: {justifyContent: 'space-between', flexDirection: 'row'},
  eventAttendeesText: {...Fonts.h6, ...VerticalMargin('s')},
  joinedCount: {
    ...Fonts.h3,
    fontSize: fontSize.h6,
    ...VerticalMargin('s'),
  },
  eventDetailsHeader: {
    ...Fonts.h1,
    fontSize: fontSize.h3,
    marginBottom: Spacing.l,
  },
  termsHeaderContainer: {
    padding: Spacing.s,
    borderRadius: BorderRadius.m,
    backgroundColor: Colors.warning,
  },
  termsHeader: {...Fonts.h4, marginBottom: Spacing.s},
  termsBody: {...Fonts.sub1, color: Colors.dark},
});
