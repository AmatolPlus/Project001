import React from 'react';
import {TextInput as RPTextInput} from 'react-native-paper';

import {ITextInput} from '@/types/TextInput';
import { Colors } from '@/utils/colors';

const TextInput = (props: ITextInput) => (
  <RPTextInput {...props} 
  
  cursorColor={Colors.info}
  mode="outlined" />
);

export default TextInput;
