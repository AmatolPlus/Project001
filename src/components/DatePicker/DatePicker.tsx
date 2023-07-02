import RNDatePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, {useCallback} from 'react';
import {Colors} from '@/utils/colors';

interface IDatePicker {
  visible: boolean;
  onDateChange: (props: any) => void;
  onClose: () => void;
  date: string;
}

const DatePicker = ({visible, onDateChange, date, onClose}: IDatePicker) => {
  const handleDateChange = useCallback(
    (e: DateTimePickerEvent | any) => {
      const _date = new Date(e?.nativeEvent?.timestamp);
      const year = _date.getFullYear();
      const month = (_date.getMonth() + 1).toString().padStart(2, '0');
      const day = _date.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      onDateChange(formattedDate);
      onClose();
    },
    [onClose, onDateChange],
  );

  return visible ? (
    <RNDatePicker
      style={{
        backgroundColor: Colors.info,
      }}
      value={new Date(date)}
      display="spinner"
      minimumDate={new Date(1980, 0, 1)}
      maximumDate={new Date(2023, 0, 1)}
      onChange={handleDateChange}
      mode="date"
    />
  ) : (
    <></>
  );
};

export default DatePicker;
