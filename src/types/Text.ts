import React from 'react';
import {TextStyle, TextProps} from 'react-native';
import {} from 'react-native-paper';

export interface IText extends TextProps<Text> {
  style?: TextStyle;
  children: React.ReactNode;
  color?: string;
}
