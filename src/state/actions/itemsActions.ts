import { Dispatch } from "redux";
import {
  ITEMS_RECEIVED,
  ITEM_ADDED,
  ITEM_UPDATED,
  ITEM_CONFIRMED,
  ITEM_DELETED,
  LIST_EMPTIED,
  ItemsDispatchTypes,
  IItem,
} from "../../interfaces";
import { author, updateLocalStorage } from "../../utils";
import { listApiController } from "../../controllers/listApiController";

export const refreshList = () => async () => {
  const items = await listApiController.getItems();

  updateLocalStorage(items);

  return {
    type: ITEMS_RECEIVED,
    payload: items,
  };
};

export const addItem =
  (item: string) =>
  async (dispatch: Dispatch<ItemsDispatchTypes>, getState: any) => {
    const items = getState().app.items;

    const newItem: IItem = {
      hasQuestionMark: item.includes("?"),
      author: author,
      value: item,
    };

    return await listApiController
      .addItem(newItem)
      .then(() => {
        refreshList()();
      })
      .then(() => {
        return {
          type: ITEM_ADDED,
          payload: { newItem, ...items },
        };
      });
  };

export const updateItem = (itemKey: string, updateItemValue: string) => {
  async (dispatch: Dispatch<ItemsDispatchTypes>, getState: any) => {
    const state = getState().items;
    const tempItems = { ...state.items }; // todo

    Object.keys(tempItems).map((key: string) => {
      if (itemKey === key) {
        tempItems[key].value = updateItemValue;
        tempItems[key].hasQuestionMark = updateItemValue.includes("?");
      }

      return tempItems[key];
    });

    dispatch({
      type: ITEM_UPDATED,
      payload: tempItems,
    });

    await listApiController.updateItem(itemKey, tempItems[itemKey]).then(() => {
      refreshList();
    });
  };
};

export const confirmItem = (itemKey: string) => {
  async (dispatch: Dispatch<ItemsDispatchTypes>, getState: any) => {
    const state = getState().items;
    const tempItems = { ...state.items }; // todo

    Object.keys(tempItems).map((key: string) => {
      if (itemKey === key) {
        tempItems[key].value = tempItems[key].value.replace("?", "");
        tempItems[key].hasQuestionMark = false;
      }

      return tempItems[key];
    });

    dispatch({
      type: ITEM_CONFIRMED,
      payload: tempItems,
    });

    await listApiController.updateItem(itemKey, tempItems[itemKey]).then(() => {
      refreshList();
    });
  };
};

export const deleteItem = (itemKey: string) => {
  async (dispatch: Dispatch<ItemsDispatchTypes>, getState: any) => {
    const state = getState().items;
    const tempItems = { ...state.items };
    delete tempItems[itemKey];

    dispatch({
      type: ITEM_DELETED,
      payload: tempItems,
    });

    await listApiController.deleteItem(itemKey).then(() => {
      refreshList();
    });
  };
};

export const emptyList = () => {
  async (dispatch: Dispatch<ItemsDispatchTypes>) => {
    await listApiController.emptyList();

    dispatch({
      type: LIST_EMPTIED,
    });
  };
};
