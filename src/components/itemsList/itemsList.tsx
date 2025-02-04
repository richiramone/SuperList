import Item from '../item';
import { useEffect } from 'react';
import { atom, useAtom } from 'jotai';
import { isLoadingAtom, needsRefreshAtom } from '../../atoms';
import { getItems } from '../../server/db-client';
import { IItem } from '../../interfaces';
import { getDuplicatedAmounts } from '../../utilities';

export const itemsAtom = atom<IItem[]>([]);

const ItemsList: React.FC = () => {
  const [, setIsLoading] = useAtom(isLoadingAtom);
  const [needsRefresh] = useAtom(needsRefreshAtom);
  const [items, setItems] = useAtom(itemsAtom);

  const loadItems = async () => {
    await getItems().then(dbResult => {
      const freshItems = dbResult as IItem[];

      freshItems.map(item => {
        item.hasDuplicate = getDuplicatedAmounts(freshItems, item.text) > 1;
      });

      setItems(freshItems);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    loadItems();
    // eslint-disable-next-`line react-hooks/exhaustive-deps
  }, [needsRefresh]);

  return (
    <div className="mb-20 mr-0 mt-4">
      <ul className="m0 p0 flex list-none flex-wrap items-center justify-start">
        {items.map((item: IItem, index) => (
          <li className="mb-4 ml-0 mr-4 mt-0 h-auto w-auto max-w-sm" key={index}>
            <Item item={item} id={item.id!.toString()} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsList;
