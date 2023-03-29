import {useTheme} from 'react-native-paper';

type colorType = 'primary' | 'secondary' | 'danger';

export function useColors(): colorType {
  const theme: any = useTheme();
  return theme.colors;
}
