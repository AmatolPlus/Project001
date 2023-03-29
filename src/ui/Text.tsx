import React from 'react';
import {Text as RPText} from 'react-native-paper';
import {IText} from '../types/Text';

const Text = (props: IText) => <RPText {...props}>{props.children}</RPText>;

export default Text;
