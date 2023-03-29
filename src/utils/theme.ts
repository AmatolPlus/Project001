import {MD3LightTheme as DefaultTheme} from 'react-native-paper';
import {Colors} from './colors';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    secondary: Colors.dark,
    danger: Colors.danger,
  },
};

export {theme};
