import { IItems } from '../Interfaces/AppInterfaces';

export const reverseItems = (items: IItems) => {
  return Object.keys(items)
    .reverse()
    .reduce((a: IItems, key) => {
      a[key] = items[key];
      return a;
    }, {});
};

export const hasDuplicatedValue = (items: IItems, newValue: string) => {
  let alreadyExists = false;

  for (const [key] of Object.entries(items)) {
    const itemValue = items[key].value.toLowerCase();
    const newValueLowered = newValue.toLowerCase();

    if (itemValue.includes(newValueLowered) || newValueLowered.includes(itemValue)) {
      alreadyExists = true;
      break;
    }
  }

  return alreadyExists;
};
