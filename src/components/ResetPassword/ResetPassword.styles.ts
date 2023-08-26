import {Colors} from '@/utils/colors';
import {BorderRadius, Spacing} from '@/utils/constants';
import {Fonts, fontSize} from '@/utils/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  link: {
    color: Colors.info,
  },
  modal: {
    padding: Spacing.xl,
  },
  container: {
    width: '100%',
    padding: Spacing.xl,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.m,
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: Colors.white,
    borderColor: Colors.grey,
    borderRadius: BorderRadius.xs,
    paddingHorizontal: Spacing.m,
    marginBottom: Spacing.m,
    color: Colors.info,
  },
  error: {
    color: Colors.danger,
    ...Fonts.h3,
    marginVertical: Spacing.m,
    fontSize: fontSize.h6,
    textAlign: 'center',
  },
  button: {
    padding: Spacing.xs,
    marginTop: Spacing.l,
  },
  buttonText: {
    ...Fonts.h3,
    color: Colors.white,
    fontSize: fontSize.h5,
  },
});
