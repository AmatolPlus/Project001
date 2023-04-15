import {Spacing, SpacingType} from './constants';

function VerticalPadding(value: SpacingType) {
  return {
    paddingVertical: Spacing[value],
  };
}

function HorizontalPadding(value: SpacingType) {
  return {
    paddingHorizontal: Spacing[value],
  };
}

function VerticalMargin(value: SpacingType) {
  return {
    marginVertical: Spacing[value],
  };
}

function HorizontalMargin(value: SpacingType) {
  return {
    marginHorizontal: Spacing[value],
  };
}

interface ICenterItem {
  justifyContent: 'center';
  flex: number;
}

function CenterItem(): ICenterItem {
  return {
    justifyContent: 'center',
    flex: 1,
  };
}

export {
  HorizontalMargin,
  HorizontalPadding,
  CenterItem,
  VerticalMargin,
  VerticalPadding,
};
