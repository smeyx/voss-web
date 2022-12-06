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
            <div className="grid grid-cols-2 lg:grid-cols-5">
              <div className="col-span-1 lg:col-span-2">
                {c.name}
              </div>
              <div className="col-span-1 lg:col-span-3">
                <div className="flex flex-col lg:grid lg:grid-cols-8 gap-2 break-all">
                  <span className="w-3/8 lg:col-span-4">{c.address.street} {c.address.housenumber}</span>
                  <span className="w-2/8 lg:col-span-2">{c.address.postalcode}</span>
                  <span className="w-3/8 lg:col-span-2">{c.address.city}</span>
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
      { customerList && customerList.length > 0 ? children : null }
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
