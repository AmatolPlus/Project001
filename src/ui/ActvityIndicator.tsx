import {IActivityIndicator} from '@/types/ActivityIndicator';
import React from 'react';
import {ActivityIndicator as RPActivityIndicator} from 'react-native-paper';

const ActivityIndicator = (props: IActivityIndicator) => (
  <RPActivityIndicator {...props} />
);

export default ActivityIndicator;
