import {StyleSheet} from 'react-native';
import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts} from '@/utils/fonts';

export const styles = StyleSheet.create({
  participantText: {textAlign: 'left', color: Colors.info},
  modalContainer: {
    padding: Spacing.l,
  },
  modal: {
    width: '100%',
    height: '100%',
    padding: Spacing.l,
    borderRadius: BorderRadius.m,
    backgroundColor: Colors.white,
  },
  header: {
    ...Fonts.h1,
  },
});
