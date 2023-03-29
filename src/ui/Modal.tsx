import React from 'react';
import {Modal as RPModal} from 'react-native-paper';

import {IModal} from '../types/Avatar';

const Modal = (props: IModal) => <RPModal {...props}>{props.children}</RPModal>;

export default Modal;
