import {IChip} from '@/types/Chip';
import React from 'react';
import {Chip as RPChip} from 'react-native-paper';

const Chip = (props: IChip) => <RPChip {...props} />;

export default Chip;
