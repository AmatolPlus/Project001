import {Portal} from 'react-native-paper';
import React, {useCallback, useState} from 'react';
import {Pressable, TouchableOpacity, View} from 'react-native';
import TextInput from '@/ui/TextInput';
import {styles} from './GenderSelector.styles';
import {Text, Modal} from '@/ui';
interface IGenderDropdown {
  onChange: (props: string) => void;
  selectedOption: string;
}

const options = ['Male', 'Female'];

const GenderSelector = ({onChange, selectedOption}: IGenderDropdown) => {
  const [visible, setVisible] = useState(false);

  const handleGenderPickerToggle = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const handleSelect = useCallback(
    (val: string) => {
      onChange(val);
      handleGenderPickerToggle();
    },
    [handleGenderPickerToggle, onChange],
  );

  return (
    <View>
      <Pressable onPress={() => setVisible(true)}>
        <TextInput
          placeholder="Gender"
          style={styles.input}
          value={selectedOption}
          editable={false}
        />
      </Pressable>
      <Portal>
        <Modal
          style={styles.modal}
          onDismiss={handleGenderPickerToggle}
          visible={visible}>
          <View style={styles.card}>
            {options.map((item: string) => {
              return (
                <TouchableOpacity onPress={() => handleSelect(item)}>
                  <Text style={styles.option}>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default GenderSelector;
