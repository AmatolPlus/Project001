import React from 'react';
import {Button as RPButton} from 'react-native-paper';

import {IButton} from '../types/Button';

const Button = (props: IButton) => (
  <RPButton {...props}>{props.children}</RPButton>
);

export default Button;
