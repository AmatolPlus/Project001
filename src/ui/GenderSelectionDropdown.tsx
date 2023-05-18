import {Menu} from 'react-native-paper';
import React, {memo} from 'react';
import Text from './Text';
import {View} from 'react-native';

interface IGenderDropdown {
  visible: boolean;
  handleGenderMenuToggle: () => void;
  selectedGender: (prop: string) => void;
}

const GenderSelectionDropdown = ({
  visible,
  handleGenderMenuToggle,
  selectedGender,
}: IGenderDropdown) => {
  return (
    <View>
      <Menu onDismiss={handleGenderMenuToggle} visible={visible} anchor={<></>}>
        <Menu.Item title="Male" onPress={() => selectedGender('Male')} />
        <Menu.Item title="Female" onPress={() => selectedGender('Female')} />
      </Menu>
    </View>
  );
};

export default memo(GenderSelectionDropdown);
