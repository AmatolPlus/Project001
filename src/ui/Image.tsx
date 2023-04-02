import {IImage} from '@/types/Image';
import React from 'react';
import FastImage from 'react-native-fast-image';

export default function Image(props: IImage) {
  return <FastImage {...props} />;
}
