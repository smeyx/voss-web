import { useMemo } from 'react';
import type { ReactElement } from 'react';
import type { Customer } from '@models/customer';

interface CustomerListProps {
  customerList: Customer[],
  children?: ReactElement
}

const CustomerList: React.FC<CustomerListProps> = ({ customerList = [], children }): ReactElement => {
  const customerListElement = useMemo( 
    () => {
      if(!Array.isArray(customerList)) {
        return (<></>);
      }

      return customerList.map( 
        (c: Customer ) => (
          <div key={ c.id } className="p-2 mb-1 border bg-neutral-100 shadow-sm rounded-md border-neutral-200 dark:border dark:border-neutral-800 dark:bg-neutral-700">
            <div className="grid grid-cols-2">
              <div className="col-span-1">
                {c.name}
              </div>
              <div className="col-span-1">
                <div className="flex flex-col">
                  <p>{c.address.street}{' '}{c.address.housenumber}</p>
                  <p>{c.address.postalcode}{' '}{c.address.city}</p>
                </div>
              </div>
            </div>
          </div>
        )
      )
    }
    , [customerList]);

  return (
    <div className="mt-5">
      <div>
        { customerList && customerList.length > 0 && 
          customerListElement
        }
      </div>
      <div>
        { customerList && customerList.length > 0 &&
          children
        }
      </div>
    </div>
  );
};

export default CustomerList;
