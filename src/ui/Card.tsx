import React from 'react';
import {Card as RPCard} from 'react-native-paper';
import {ICard} from '../types/Card';

const Card = (props: ICard) => <RPCard {...props}>{props.children}</RPCard>;

export default Card;
