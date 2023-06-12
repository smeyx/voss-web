import { useMemo } from 'react';
import type { ReactElement } from 'react';

type GenericListProps<Item> = {
  items: Item[],
  renderItem: (item: Item) => JSX.Element
  children?: ReactElement
}

// generic so that renderItem extracts type
const GenericList = <T extends {}>({ items = [], renderItem, children }: GenericListProps<T>): ReactElement => {
  const listItems = useMemo( 
    () => {
      if(!Array.isArray(items)) {
        return (<></>);
      }

      return items.map(renderItem)
    }
    , [items, renderItem]);
  
  const pagination = items && items.length > 0 ? children : null;

  return (
    <div className="mt-5">
      { pagination }
      <ul>
        { items && items.length > 0 && 
          listItems
        }
      </ul>
      <div>
        { pagination }
      </div>
    </div>
  );
};

export default GenericList;
