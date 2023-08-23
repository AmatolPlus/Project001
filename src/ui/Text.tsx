import {Colors} from '@/utils/colors';
import {Fonts} from '@/utils/fonts';
import React from 'react';
import {Text as RPText} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {IText} from '../types/Text';

const Text = ({style = {}, ...props}: IText) => {
  const styles = StyleSheet.create({
    textStyle: {...Fonts.h5, color: Colors.dark},
  });

  return (
    <RPText style={(styles.textStyle, {...style})} {...props}>
      {props.children}
    </RPText>
  );
};

export default Text;
