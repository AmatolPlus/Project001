import React from 'react';
import {TextStyle} from 'react-native';
import {TextProps} from 'react-native-paper';

export interface IText extends TextProps<Text> {
  style?: TextStyle;
  children: React.ReactNode;
}
