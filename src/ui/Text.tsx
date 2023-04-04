import {Colors} from '@/utils/colors';
import {Fonts} from '@/utils/fonts';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Text as RPText} from 'react-native-paper';
import {IText} from '../types/Text';

const Text = ({style = {}, ...props}: IText) => (
  <RPText style={(styles.textStyle, {...style})} {...props}>
    {props.children}
  </RPText>
);

const styles = StyleSheet.create({
  textStyle: {color: Colors.dark, ...Fonts.h5},
});

export default Text;
