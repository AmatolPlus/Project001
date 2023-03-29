import React from 'react';
import {List as RPList} from 'react-native-paper';

import {ListProps} from '../types/List';

const List: React.FC<ListProps> = ({items, onPress}) => {
  return (
    <RPList.Section>
      {items.map((item, index) => (
        <RPList.Item
          key={index}
          title={item.title}
          description={item.description}
          onPress={() => onPress(index)}
        />
      ))}
    </RPList.Section>
  );
};

export default List;
