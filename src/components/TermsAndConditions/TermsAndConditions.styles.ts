import {height} from '@/utils/Dimension';
import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {VerticalPadding} from '@/utils/spacing';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  link: {
    color: Colors.info,
  },
  modal: {
    padding: Spacing.xl,
    height: height / 1.2,
    marginTop: height / 10.6,
  },
  modalContainer: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.m,
    padding: Spacing.xl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...VerticalPadding('m'),
    marginBottom: Spacing.l,
  },
  heading: {
    ...Fonts.h1,
    fontSize: fontSize.h3,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
});
