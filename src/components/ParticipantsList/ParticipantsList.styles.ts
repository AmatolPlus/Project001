import {StyleSheet} from 'react-native';
import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';

export const styles = StyleSheet.create({
  participantText: {textAlign: 'left', color: Colors.info},
  modalContainer: {
    padding: Spacing.xl,
  },
  modal: {
    width: '100%',
    height: '100%',
    padding: Spacing.l,
    borderRadius: BorderRadius.m,
    backgroundColor: Colors.white,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
  },
  header: {
    ...Fonts.h1,
  },
  listContainer: {
    flex: 1,
    display: 'flex',
    borderWidth: 0.5,
    marginTop: Spacing.m,
    borderColor: Colors.dark,
    padding: Spacing.s,
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: Spacing.xl * 3,
    borderRadius: BorderRadius.l,
    height: Spacing.xl * 3,
  },
  name: {
    ...Fonts.h3,
    fontSize: fontSize.h5,
  },
  rank: {
    ...Fonts.h3,
    fontSize: fontSize.h6,
    color: Colors.dark2,
  },
  infoContainer: {
    marginLeft: Spacing.m,
  },
});
