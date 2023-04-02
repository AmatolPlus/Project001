import {Colors} from '@/utils/colors';
import React from 'react';
import {Text as RPText} from 'react-native-paper';
import {IText} from '../types/Text';

const Text = ({style = {}, ...props}: IText) => (
  <RPText style={{color: Colors.dark, ...style}} {...props}>
    {props.children}
  </RPText>
);

export default Text;
