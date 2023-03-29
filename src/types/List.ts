export interface Item {
  title: string;
  description: string;
}

export interface ListProps {
  items: Item[];
  onPress: (index: number) => void;
}
