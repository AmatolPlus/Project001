import React from 'react';
import {Tooltip as RPToolTip} from 'react-native-paper';

import {IToolTip} from '@/types/ToolTip';

const ToolTip = (props: IToolTip) => (
  <RPToolTip {...props}>{props.children}</RPToolTip>
);

export default ToolTip;
