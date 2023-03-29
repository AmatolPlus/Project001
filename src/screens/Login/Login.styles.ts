import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';
import {Spacing} from '../../utils/constants';
import {CenterItem} from '../../utils/spacing';

let styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light,
    padding: Spacing.l,
    ...CenterItem(),
  },
  title: {
    fontSize: Spacing.xl,
    fontWeight: 'bold',
  },
  nameInput: {
    width: '100%',
    margin: Spacing.s,
  },
  loginButton: {
    borderRadius: Spacing.xs,
    alignSelf: 'flex-start',
  },
});

export default styles;
