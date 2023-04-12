import React from 'react';
import {TextInput as RPTextInput} from 'react-native-paper';

import {ITextInput} from '@/types/TextInput';

const TextInput = (props: ITextInput) => (
  <RPTextInput {...props} mode="outlined" />
);

export default TextInput;
