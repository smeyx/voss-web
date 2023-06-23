import useSwr, { KeyedMutator } from 'swr';
import fetchJSON from '../fetchJSON';
import type { CustomerApiResponse } from '@pages/api/customers';
import type { Customer } from '@models/customer';

interface customerData {
  customers?: Customer[],
  count?: number,
  mutateCustomers: KeyedMutator<CustomerApiResponse>,
  isLoading: boolean,
}

export default function useCustomers(
  user_id: number
): customerData {
  const { data, mutate, isLoading } = useSwr(`/api/customers?user_id=${user_id}`, fetchJSON<CustomerApiResponse>);

  return {
    customers: data?.customers,
    count: data?.count,
    mutateCustomers: mutate,
    isLoading,
  }
}