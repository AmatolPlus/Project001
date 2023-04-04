import {Colors} from '@/utils/colors';
import {Fonts} from '@/utils/fonts';
import React from 'react';
import {Text as RPText} from 'react-native-paper';
import {IText} from '../types/Text';

const Text = ({style = {}, ...props}: IText) => (
  <RPText style={{color: Colors.dark, ...Fonts.h5, ...style}} {...props}>
    {props.children}
  </RPText>
);

export default Text;
