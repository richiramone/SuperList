import { IItem } from '../interfaces';

export const hasDuplicatedValue = (items: IItem[], newValue: string) => {
  let alreadyExists = false;

  items.every(item => {
    const itemValue = item.text.toLowerCase();
    const newValueLowered = newValue.toLowerCase();

    if (itemValue.includes(newValueLowered) || newValueLowered.includes(itemValue)) {
      alreadyExists = true;
    } else {
      return true;
    }
  });

  return alreadyExists;
};

export const noop = () => {};

export const sanitize = (input: string) => {
  return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
};

export const areItemsDifferent = (items1: IItem[], items2: IItem[]) => {
  return JSON.stringify(items1) !== JSON.stringify(items2);
};
