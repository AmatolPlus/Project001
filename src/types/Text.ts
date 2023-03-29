import React from 'react';
import {TextProps} from 'react-native-paper';

export interface IText extends TextProps<Text> {
  children: React.ReactNode;
}
