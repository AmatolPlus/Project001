import React from 'react';
import {ISnackbarProps} from '@/types/Snackbar';

import {Snackbar as RPSnackbar} from 'react-native-paper';

const Snackbar = (props: ISnackbarProps) => {
  return <RPSnackbar {...props} />;
};

export default Snackbar;
