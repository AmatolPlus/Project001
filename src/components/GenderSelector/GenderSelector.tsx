import React, {useCallback, useState} from 'react';
import {Portal} from 'react-native-paper';
import {Pressable, TouchableOpacity, View} from 'react-native';

import {Text, TextInput, Modal} from '@/ui';
import {Colors} from '@/utils/colors';
import {styles} from './GenderSelector.styles';

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
          editable={false}
          value={selectedOption}
          placeholder="Gender"
          cursorColor={Colors.info}
          outlineColor={Colors.white}
          activeOutlineColor={Colors.white}
          className="h-8 p-0 w-52 bg-white text-info  text-sm border-b-2 border-b-info"
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
                <TouchableOpacity key={item} onPress={() => handleSelect(item)}>
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
