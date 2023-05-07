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
  list: {height: 270},
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
  },
  desc: {
    ...Fonts.h5,
    fontSize: fontSize.h4,
  },
  more: {
    color: Colors.info,
  },
  moreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    color: Colors.info,
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

  prizeLinkContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {...Fonts.h3, fontSize: fontSize.s1, color: Colors.info},
  eventAttendees: {justifyContent: 'space-between', flexDirection: 'row'},
  eventAttendeesText: {...Fonts.h6, ...VerticalMargin('s')},
  joinedCount: {
    ...Fonts.h3,
    fontSize: fontSize.h6,
    ...VerticalMargin('s'),
  },
  timerContainer: {
    marginVertical: Spacing.m,
  },
  timerHeader: {
    ...Fonts.h1,
    fontSize: fontSize.h5,
    marginTop: Spacing.xs,
    color: Colors.danger,
  },
  timer: {
    ...Fonts.h3,
    fontSize: fontSize.h6,
    paddingTop: Spacing.xs,
  },
  eventDetailsHeader: {
    ...Fonts.h1,
    fontSize: fontSize.h3,
  },
  eventDetailsSubHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  eventDetailsSubHeader: {
    ...Fonts.h3,
    color: Colors.grey,
    marginLeft: 0,
    fontSize: fontSize.h6,
    marginBottom: Spacing.xs,
  },
  termsHeaderContainer: {
    padding: Spacing.s,
    borderRadius: BorderRadius.m,
    backgroundColor: Colors.warning,
  },
  termsHeader: {...Fonts.h4, marginBottom: Spacing.s},
  termsBody: {...Fonts.sub1, color: Colors.dark},
  postCard: {
    height: 250,
    width: 200,
    backgroundColor: Colors.light,
    marginLeft: Spacing.xs,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  postCardImage: {
    position: 'absolute',
    bottom: 0,
    height: 55,
    width: '100%',
    backgroundColor: Colors.white,
    gap: 2,
    padding: Spacing.xs,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  note: {
    display: 'flex',
    alignItems: 'center',
    padding: Spacing.m,
    justifyContent: 'space-between',
    marginVertical: Spacing.m,
    flexDirection: 'row',
    backgroundColor: Colors.light,
  },
  noteTextContainer: {width: '70%'},
  noteDate: {
    ...Fonts.h3,
    fontSize: fontSize.h6,
  },
  eventHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.m,
  },
});
