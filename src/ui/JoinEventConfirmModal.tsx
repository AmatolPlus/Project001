import React from 'react';
import {Portal} from 'react-native-paper';

import Modal from './Modal';
import {height} from '@/utils/Dimension';
import OrderSummary from '@/components/OrderSummary/OrderSummary';

height;
interface IJoinEventModal {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  entryFee: number | string;
  contestName: string;
  wallet: string | number;
}

const JoinEventConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  entryFee,
  contestName,
  wallet,
}: IJoinEventModal) => {
  return (
    <Portal>
      <Modal onDismiss={onClose} visible={isOpen}>
        <OrderSummary
          onConfirm={onConfirm}
          onClose={onClose}
          contestName={contestName}
          entryFee={entryFee}
          wallet_amount={wallet}
        />
      </Modal>
    </Portal>
  );
};

export default JoinEventConfirmModal;
