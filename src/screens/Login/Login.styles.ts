import {Fonts, fontSize} from '@/utils/fonts';
import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';
import {BorderRadius, Spacing} from '../../utils/constants';
import {CenterItem} from '../../utils/spacing';

let styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light,
    padding: Spacing.xl * 2,
    ...CenterItem(),
  },
  title: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    color: Colors.purple,
    ...Fonts.title,
  },
  input: {
    ...Fonts.h5,
    width: '100%',
    borderRadius: BorderRadius.l,
    margin: Spacing.s,
  },
  loginButtonContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: Spacing.m,
  },
  loginButton: {
    borderRadius: Spacing.xs,
    marginTop: Spacing.s,
  },
  loginButtonText: {
    ...Fonts.h3,
    fontSize: fontSize.h4,
  },
  close: {
    position: 'absolute',
    top: Spacing.l,
    right: Spacing.l,
  },
});

export default styles;
